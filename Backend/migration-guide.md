// migration-guide.md
# Database Migration Best Practices

## For Development:
- Use `synchronize: true` for rapid development
- Drop/recreate database when schema changes significantly

## For Production:
- Use `synchronize: false`
- Use TypeORM migrations: `npm run typeorm:generate-migration`
- Always backup before schema changes

## Column Constraint Changes:
1. Add new column as nullable first
2. Populate existing records
3. Change to NOT NULL in separate migration
4. Add default values where appropriate

## Commands:
```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run
```