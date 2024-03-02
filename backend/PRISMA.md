# PRISMA Guide by ALV

We use prisma as the ORM to our MySQL service.

## After Updating the schema

Prisma provides commands we need to run to generate the client and manage migrations

### to update the client

```
pnpx prisma generate
```

### to create a new migration
```
pnpx prisma migrate dev --name <any name>
```