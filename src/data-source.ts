import { DataSource } from 'typeorm';
import "dotenv/config"
import app from './app';

const PostgresDataSource = new DataSource (
    {   type: "postgres",
        host: process.env.HOST,
        port: 5432,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        synchronize: false,
        logging: true,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
    }
)

PostgresDataSource.initialize()
    .then(() => {
        app.listen(3333, () => {
            console.log("Banco de dados inicializado!")
        })
    })
    .catch((err) => {
        console.error("Erro durante a inicialização do banco de dados", err)
    })