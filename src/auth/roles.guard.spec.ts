import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from '../generated/prisma';

describe('RolesGuard', () => {
  it('blocks access when role does not match', () => {
    class TestController {
      @Roles(UserRole.ADMIN)
      handler() {
        return true;
      }
    }

    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);

    const context = {
      getHandler: () => TestController.prototype.handler,
      getClass: () => TestController,
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.STAFF } }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(false);
  });

  it('blocks access when user is missing', () => {
    class TestController {
      @Roles(UserRole.ADMIN)
      handler() {
        return true;
      }
    }

    const reflector = new Reflector();
    const guard = new RolesGuard(reflector);

    const context = {
      getHandler: () => TestController.prototype.handler,
      getClass: () => TestController,
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(false);
  });
});
