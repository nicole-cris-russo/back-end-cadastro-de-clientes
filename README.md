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
#
> ## Criação de usuário:

> post: /user
- Request:
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
#
> ## Edição de dados do usuário:
 
> patch: /user
- Request com qualquer campo entre eles fullName, email, password:
```
{
	"fullName": "user"
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
	"updated_at": "2023-04-10T21:41:45.972Z"
}
```
- Response ao tentar editar o campo isAdm ou qualquer campo não existente sendo usuário comum (401):
```
{
	"message": "Um ou mais campos informados são inválidos"
}
```
#
> ## Acesso ao perfil do user logado

> get: user/profile
- Response (200):
```
{
	"id": "a58bd334-e7de-470c-b65e-cfd113a7994e",
	"fullName": "user",
	"email": "user@email.com",
	"password": "$2b$15$oPEK/RZhG8ZV0pn3FWuMn.oL2xSQSCXESj43/4UOQ6DU1oKyYHgre",
	"isAdm": false,
	"created_at": "2023-04-10T20:09:16.934Z",
	"updated_at": "2023-04-10T21:48:36.626Z",
	"clients": []
}
```
#
> ## Acesso ao perfil do user por id

> get: user/:id
- Response caso o user comum esteja acessando o próprio id ou seja Adm (200):
```
{
	"id": "a58bd334-e7de-470c-b65e-cfd113a7994e",
	"fullName": "user",
	"email": "user@email.com",
	"password": "$2b$15$oPEK/RZhG8ZV0pn3FWuMn.oL2xSQSCXESj43/4UOQ6DU1oKyYHgre",
	"isAdm": false,
	"created_at": "2023-04-10T20:09:16.934Z",
	"updated_at": "2023-04-10T21:48:36.626Z",
	"clients": []
}
```
- Response caso o id não seja encontrado no banco (404):
```
{
	"message": "Usuário não encontrado"
}
```
- Response caso o id não seja do user comum (401):
```
{
	"message": "Usuário não autorizado (notadm)"
}
```

> ## Acesso a todos os usuários cadastrados

> get: user/all
- Response caso o user comum esteja acessando (401):
```
{
	"message": "Usuário não autorizado"
}
```
- Response caso o Adm esteja acessando (200):
```
[
	{
		"id": "c16abb4a-73dd-482f-8fd4-53abf28d6c19",
		"fullName": "User Comum",
		"email": "comum@email.com",
		"password": "$2b$15$xqtx9Bqk6azAMOuGl6GzieBrD.yd17xicKonuRejKwtX3u5hJ2Bu.",
		"isAdm": false,
		"created_at": "2023-04-03T01:30:22.591Z",
		"updated_at": "2023-04-03T01:30:22.591Z"
	},
	{
		"id": "0f932378-4cfb-4499-8848-f96a536683f3",
		"fullName": "ADM",
		"email": "ADM@email.com",
		"password": "$2b$15$XqzjTVhkKflWKoKjFRLhW.974qHty.uMcjB1A0KrkL2x60Vxj6cuG",
		"isAdm": true,
		"created_at": "2023-04-03T02:42:36.724Z",
		"updated_at": "2023-04-10T20:11:46.812Z"
	},
]
```
> ## Acesso aos clientes cadastrados pelo user logado

> get: /user/clients
- Response (200):
```
[
	{
		"id": "8583ea9c-1008-498c-97dc-0344267d8a26",
		"fullName": "Cliente 1",
		"email": "cliente1@email.com",
		"phone": "92929292",
		"created_at": "2023-04-03T04:33:39.438Z",
		"updated_at": "2023-04-03T04:33:39.438Z",
		"contacts": [
			{
				"id": "9e9b585b-3235-4e63-9253-1cef8b92c570",
				"fullName": "Mãe do cliente 1",
				"email": "maedocliente1@gmail.com",
				"phone": "92929292",
				"created_at": "2023-04-10T06:50:40.096Z",
				"updated_at": "2023-04-10T06:50:40.096Z",
				"client": {
					"id": "8583ea9c-1008-498c-97dc-0344267d8a26",
					"fullName": "Cliente 1",
					"email": "cliente1@email.com",
					"phone": "92929292",
					"created_at": "2023-04-03T04:33:39.438Z",
					"updated_at": "2023-04-03T04:33:39.438Z"
				}
			}
		],
		"user": {
			"id": "0f932378-4cfb-4499-8848-f96a536683f3",
			"fullName": "ADM",
			"email": "ADM@email.com",
			"password": "$2b$15$XqzjTVhkKflWKoKjFRLhW.974qHty.uMcjB1A0KrkL2x60Vxj6cuG",
			"isAdm": true,
			"created_at": "2023-04-03T02:42:36.724Z",
			"updated_at": "2023-04-10T20:11:46.812Z"
		}
	}
]
```
#
> ## Acesso aos clientes de um user por id

> get: /user/:id/clients
- Response de acesso por um user comum de um id que não é o seu (401):
```
{
	"message": "Usuário não autorizado (notadm)"
}
```
- Response caso o user comum esteja acessando pelo seu proprio id ou um Adm por um id qualquer (200):

```
[
	{
		"id": "8583ea9c-1008-498c-97dc-0344267d8a26",
		"fullName": "Cliente 1",
		"email": "cliente1@email.com",
		"phone": "92929292",
		"created_at": "2023-04-03T04:33:39.438Z",
		"updated_at": "2023-04-03T04:33:39.438Z",
		"user": {
			"id": "0f932378-4cfb-4499-8848-f96a536683f3",
			"fullName": "ADM",
			"email": "ADM@email.com",
			"password": "$2b$15$XqzjTVhkKflWKoKjFRLhW.974qHty.uMcjB1A0KrkL2x60Vxj6cuG",
			"isAdm": true,
			"created_at": "2023-04-03T02:42:36.724Z",
			"updated_at": "2023-04-10T20:11:46.812Z"
		}
	}
]
```
#
> ## Deleção de usuário

> delete: /user/:id
- Caso o user esteja passando um id nao existene (404):
```
{
	"message": "Usuário não encontrado"
}
```
- Caso o user comum queria deletar por um id que não seja o seu (401):
```
{
	"message": "Usuário não autorizado (notadm)"
}
```
- Caso delete seu proprio id (201): Sem retorno.  
#
> ## Login:

> post: /session
- Request:
```
{
	"email": "user@email.com",
	"password": "1234"
}
```
- Response (200):
```
{
	"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1OGJkMzM0LWU3ZGUtNDcwYy1iNjVlLWNmZDExM2E3OTk0ZSIsImlzQWRtIjpmYWxzZSwiaWF0IjoxNjgxMTU3NTI1LCJleHAiOjE2ODEyNDM5MjUsInN1YiI6ImE1OGJkMzM0LWU3ZGUtNDcwYy1iNjVlLWNmZDExM2E3OTk0ZSJ9.ll4HHGgNutL25gaPgIbagvpycdxeLIb-J-KInqBOnZM"
}
```
- Response com email ou senha errados (401):
```
{
	"message": "Email ou senha inválidos"
}
```



