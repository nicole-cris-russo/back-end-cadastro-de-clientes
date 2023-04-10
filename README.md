# back-end-cadastro-de-clientes
## Tecnologias utilizadas:
- <a href="https://expressjs.com/pt-br/">Express Js</a>
- <a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a>
- <a href="https://www.npmjs.com/package/cors">Cors</a>
- <a href="https://www.npmjs.com/package/dotenv">Dotenv</a>
- <a href="https://www.npmjs.com/package/express-async-errors">express-async-errors</a>
- <a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a>
- <a href="https://www.npmjs.com/package/pg">pg</a>
- <a href="https://www.npmjs.com/package/reflect-metadata">reflect-metadata</a>
- <a href="https://typeorm.io/">TypeORM</a>
- <a href="https://www.npmjs.com/package/uuid">uuid</a>
- <a href="https://www.typescriptlang.org/">TypeScript</a>
  
## Rotas de usuário:
### Criação de usuário:
> post: /user
- Request 
 ```
{
	"fullName": "user",
	"email": "user@email.com",
	"password": "1234",
	"isAdm": false
}
  ```
- Response (200):
```
  {
	"id": "a58bd334-e7de-470c-b65e-cfd113a7994e",
	"fullName": "user",
	"email": "user@email.com",
	"password": "$2b$15$IOySkCgixUWrsGRCMHamjelmAL6bE3e5MR73mXgRdNcODcaI2AVHO",
	"isAdm": false,
	"created_at": "2023-04-10T20:09:16.934Z",
	"updated_at": "2023-04-10T20:09:16.934Z"
}
```
- Response em caso de email repetido (403):
```
{
	"message": "Email já cadastrado"
}
```
### Login:
> post: /session
- Request com qualquer campo entre fullName, email, password:
```
{
	"email": "user@email.com",
	"password": "1234"
}
```