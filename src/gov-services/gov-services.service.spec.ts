import { BadRequestException } from '@nestjs/common';
import { GovServicesService } from './gov-services.service';
import { GovPricingModel } from '../generated/prisma';

const createPrismaMock = () => ({
  govService: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  govServiceUsage: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
});

const createTransactionsMock = () => ({
  createManualTransaction: jest.fn(),
});

describe('GovServicesService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('cannot start inactive service', async () => {
    const prisma = createPrismaMock();
    const transactions = createTransactionsMock();
    prisma.govService.findUnique.mockResolvedValue({
      id: 'svc-1',
      name: 'KRA',
      isActive: false,
      pricingModel: GovPricingModel.FREE,
      unitPrice: null,
      officialUrl: 'https://example.com',
    });

    const service = new GovServicesService(prisma as any, transactions as any);

    await expect(service.startUsage('svc-1', 'staff-1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('flat pricing creates transaction immediately', async () => {
    const prisma = createPrismaMock();
    const transactions = createTransactionsMock();

    prisma.govService.findUnique.mockResolvedValue({
      id: 'svc-1',
      name: 'NTSA',
      isActive: true,
      pricingModel: GovPricingModel.FLAT,
      unitPrice: 300,
      officialUrl: 'https://example.com',
    });

    prisma.govServiceUsage.create.mockResolvedValue({ id: 'usage-1' });
    prisma.govServiceUsage.update.mockResolvedValue({ id: 'usage-1' });
    transactions.createManualTransaction.mockResolvedValue({ id: 'txn-1' });

    const service = new GovServicesService(prisma as any, transactions as any);

    const result = await service.startUsage('svc-1', 'staff-1');

    expect(transactions.createManualTransaction).toHaveBeenCalled();
    expect(prisma.govServiceUsage.update).toHaveBeenCalledWith({
      where: { id: 'usage-1' },
      data: { transactionId: 'txn-1' },
    });
    expect(result.transactionId).toBe('txn-1');
  });

  it('free pricing creates no transaction', async () => {
    const prisma = createPrismaMock();
    const transactions = createTransactionsMock();

    prisma.govService.findUnique.mockResolvedValue({
      id: 'svc-1',
      name: 'eCitizen',
      isActive: true,
      pricingModel: GovPricingModel.FREE,
      unitPrice: null,
      officialUrl: 'https://example.com',
    });

    prisma.govServiceUsage.create.mockResolvedValue({ id: 'usage-1' });

    const service = new GovServicesService(prisma as any, transactions as any);

    const result = await service.startUsage('svc-1', 'staff-1');

    expect(transactions.createManualTransaction).not.toHaveBeenCalled();
    expect(result.transactionId).toBeUndefined();
  });

  it('cannot end already-ended usage', async () => {
    const prisma = createPrismaMock();
    const transactions = createTransactionsMock();

    prisma.govServiceUsage.findUnique.mockResolvedValue({
      id: 'usage-1',
      staffId: 'staff-1',
      endedAt: new Date('2025-01-01T00:00:00.000Z'),
      startedAt: new Date('2025-01-01T00:00:00.000Z'),
      govService: {
        name: 'KRA',
        pricingModel: GovPricingModel.PER_MINUTE,
        unitPrice: 50,
      },
    });

    const service = new GovServicesService(prisma as any, transactions as any);

    await expect(service.endUsage('usage-1', 'staff-1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('per-minute calculates correctly', async () => {
    const prisma = createPrismaMock();
    const transactions = createTransactionsMock();

    prisma.govServiceUsage.findUnique.mockResolvedValue({
      id: 'usage-1',
      staffId: 'staff-1',
      endedAt: null,
      startedAt: new Date('2024-12-31T23:58:30.000Z'),
      govService: {
        name: 'KRA',
        pricingModel: GovPricingModel.PER_MINUTE,
        unitPrice: 50,
      },
    });

    transactions.createManualTransaction.mockResolvedValue({ id: 'txn-1' });
    prisma.govServiceUsage.update.mockResolvedValue({ id: 'usage-1' });

    const service = new GovServicesService(prisma as any, transactions as any);

    const result = await service.endUsage('usage-1', 'staff-1');

    expect(result.minutes).toBe(2);
    expect(result.amount).toBe(100);
    expect(result.transactionId).toBe('txn-1');
  });
});
