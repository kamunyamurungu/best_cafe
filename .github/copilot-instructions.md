# AI Coding Guidelines for Best Cafe Project

## Architecture Overview
- **Framework**: NestJS with TypeScript for scalable server-side applications
- **Database**: PostgreSQL with Prisma ORM
- **Domain**: Internet cafe management system tracking computers, user sessions, pricing, and events

## Key Models & Relationships
- `Computer`: Managed devices with status (`ComputerStatus`), device tokens, and session history
- `Session`: User sessions on computers with pricing and cost calculation (`SessionStatus`)
- `Pricing`: Active pricing tiers for per-minute billing
- `User`: Admin/staff accounts with role-based access (`UserRole`)
- `Event`: Audit trail for system activities (user/computer events) with `EventType`

## Critical Workflows
- **Database Setup**: Run `npx prisma migrate dev` after schema changes (requires PostgreSQL running)
- **Client Generation**: Execute `npx prisma generate` to update Prisma client in `generated/prisma/`
- **Development**: Use `npm run start:dev` for hot-reload development server
- **Testing**: Update tests immediately after code changes - current pattern shows tests often lag behind (e.g., `app.controller.spec.ts` expects "Hello World!" but returns "Goodbye!")

## Project Conventions
- **Prisma Schema**: Enums (`ComputerStatus`, `SessionStatus`, `UserRole`, `EventType`) are defined at the end of `prisma/schema.prisma`
- **Client Output**: Prisma generates client to `../generated/prisma` (not default `node_modules`)
- **Database URL**: Configured in `.env` as `DATABASE_URL="postgresql://postgres:admin@localhost:5432/best_cafe?schema=public"` (requires local PostgreSQL)
- **Code Style**: ESLint with Prettier integration - run `npm run lint` to auto-fix
- **Testing**: Jest with e2e tests in `test/` - update assertions when changing return values

## Common Patterns
- Controllers call service methods directly (e.g., `AppController.getHello()` → `AppService.getGoodbye()`)
- Models use UUID primary keys with `createdAt` timestamps
- Relations use explicit foreign keys (e.g., `Session.computerId`)
- JSON payloads in `Event` model for flexible event data

## Gotchas
- Tests may fail if code changes aren't reflected in assertions
- Prisma migrations require active database connection
- Generated Prisma client path differs from standard setup</content>
<parameter name="filePath">c:\Users\kelly\Desktop\Kelly\APP\best_cafe\.github\copilot-instructions.md