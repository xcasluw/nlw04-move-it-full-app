<h1 align="center">
    Move It 2.0
</h1>

<h4 align="center">
  Aplicação criada reutilizando o app Move It que foi desenvolvido durante o NLW04 (trilha React), evento realizado pela Rocketseat e ministrado por Diego Fernandes.
</h4>

![App Screenshot](https://github.com/xcasluw/nlw04-move-it-full-app/blob/master/moveit.JPG)

## :rocket: Tecnologias/Libs

O projeto foi desenvolvido com as seguintes tecnologias:

### FRONT-END
-   [ReactJS](https://reactjs.org/)
-   [React Router ](https://github.com/ReactTraining/react-router)
-   [styled-components](https://www.styled-components.com/)
-   [Axios](https://github.com/axios/axios)
-   [History](https://www.npmjs.com/package/history)
-   [Polished](https://polished.js.org/)
-   [React-Icons](http://react-icons.github.io/react-icons/)
-   [React-Spring](https://www.react-spring.io/)
-   [Unform](https://github.com/Rocketseat/unform)
-   [Uuid](https://www.npmjs.com/package/uuid)
-   [Yup](https://www.npmjs.com/package/yup)

### BACK-END
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [Body-parser](https://www.npmjs.com/package/body-parser)
-   [Consign](https://www.npmjs.com/package/consign)
-   [Cors](https://www.npmjs.com/package/cors)
-   [JwtSimple](https://www.npmjs.com/package/jwt-simple)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [nodemon](https://nodemon.io/)
-   [Knex](http://knexjs.org/)
-   [Multer](https://github.com/expressjs/multer)
-   [Passport](http://www.passportjs.org/)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Nodemailer](https://nodemailer.com/about/)
-   [date-fns](https://date-fns.org/)
-   [mysql2](https://www.npmjs.com/package/mysql2)

## :information_source: Como usar

O projeto utiliza banco de dados SQL, e durante o desenvolvimento, foi utilizado o XAMPP com usuário padrão (root) e senha vazia. Obs: backend utiliza NPM, frontend utiliza Yarn

### Instalar API
```bash
# Clone o reposótirio
$ git clone https://github.com/xcasluw/nlw04-move-it-full-app

# Entre no repositório backend
$ cd nlw04-move-it-full-app/backend

# Instale as dependências
$ npm install

# Crie uma base de dados chamada moveitapp e configure o arquivo knexfile.js
$ connection: { database: "moveitapp", user: "root", password: "", },

# Rode as migrations para criação das tabelas
$ knex migrate:latest

# Rode a API
$ npm run serve
```

### Instalar Front
```bash

# Navegue até a pasta do front
$ cd nlw04-move-it-full-app/frontend-react

# Instale as dependências com o yarn
$ yarn install

# Rode o frontend
$ yarn start
```


Desenvolvido com ♥ por Lucas Genari :wave: [Get in touch!](https://www.linkedin.com/in/xcasluw/)