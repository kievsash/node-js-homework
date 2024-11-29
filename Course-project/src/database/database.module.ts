import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      useFactory: () => {
        return new Pool({
          host: 'localhost',//process.env.DB_HOST || 'localhost',
          port: 5412, //parseInt(process.env.DB_PORT, 10) || 5412,
          user: process.env.POSTGRES_USER || 'postgres',
          password: process.env.POSTGRES_PASSWORD || 'postgres',
          database: process.env.POSTGRES_DB || 'nest_app',
        });
      },
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
