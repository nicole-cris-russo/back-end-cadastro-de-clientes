import { DataSource } from 'typeorm';
import "dotenv/config"
import app from './app';

export const PostgresDataSource = new DataSource (
    {   type: "postgres",
        host: process.env.HOST,
        port: 5432,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        synchronize: false,
        logging: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
    }
)

const port = process.env.PORT || 3333

PostgresDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log("Banco de dados inicializado!")
        })
    })
    .catch((err) => {
        console.error("Erro durante a inicialização do banco de dados", err)
    })