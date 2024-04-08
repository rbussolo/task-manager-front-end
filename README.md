## Task Manager - Front-end

Projeto de Gerenciamento de Tarefas por Usuário

### Configuração

Para configurar o front-end, necessário verificar o arquivo /src/services/api.ts, dentro dele tem a URL base de onde vai rodar a aplicação:

```
const BASE_URL = "http://localhost:3000/api/";
```

Caso o back-end esteja em outro local, é necessário mudar esta configuração.

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