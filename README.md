## Task Manager - Front-end

Projeto de Gerenciamento de Tarefas por Usuário

### Configuração

Para configurar o front-end, necessário verificar o arquivo .env que contem a informação da URL Base da aplicação, por padrão esta definido::

```
const BASE_URL = "http://localhost:3000/api/";
```

Caso o back-end esteja em outro local, é necessário mudar esta configuração.

Obs: Se utilizar o Docker, é necessário alterar o arquivo .env.production

### Instalação

1. Primeiro instalar as dependencias

```
npm install
```

2. Agora startar a aplicação

```
npm run dev
```

Caso for utilizar a imagem docker, basta realizar a configuração antes da BASE_URL.
