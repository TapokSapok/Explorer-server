import { registerAs } from '@nestjs/config';
import { Dialect } from 'sequelize';

export const sqlConfig = registerAs('database', () => ({
   dialect: <Dialect>'postgres',
   logging: process.env.POSTGRES_LOGGING === 'true' ? true : false,
   host: process.env.POSTGRES_HOST,
   port: +process.env.POSTGRESS_PORT,
   username: process.env.POSTGRES_USER,
   password: process.env.POSTGRESS_PASSWORD,
   database: process.env.POSTGRES_DB,
   synchronize: true,
   autoLoadModels: true,
}));
