import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
config();

export const dataSourceOption: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    migrations: [__dirname + '/db/migrations/**/**{.js,.ts}'],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsRun: false,
    logging: true,
}
const AppDataSource = new DataSource(dataSourceOption);

export default AppDataSource;  