# HxH_RPG_Environment_API

Uma API RESTful com Modelagem Orientada a Domínio (Domain-Driven Modeling) construída com TypeScript e Nest.js para a Aplicação Web HxH_RPG_Environment.

## Descrição

Este é um Web Service Node.js em constante expansão, criado para promover uma comunidade de Hunter X Hunter RPG. Utiliza o ecossistema JavaScript/TypeScript em Nest.js com Express.js, PrismaORM com PostgreSQL para o banco de dados, Jest com Supertest e Faker para testes automatizados, ESLint e Prettier para padrões de código. As camadas de arquitetura são construídas com base na Arquitetura Limpa e Arquitetura Hexagonal.

## Demo

### Link do Deploy da API: https://hxh-rpg-environment-api.onrender.com

<br />

## Sobre

As funcionalidades principais que essa API serve para o sistema de gerenciamento contemplam:
- Criação de conta de usuário (jogador, mestre e assistente)
- Criação de personagem 
- Criação de Habilidades Nen
- Sistema de treinamento e evolução de personagem
- Simulação de evolução de personagem
- Gerenciador de partidas PvP
- Criação e gerenciador de cenários e campanhas
- Criação e gerenciador de partidas com mestres e jogadores
- Publicação de campanhas e partidas públicas (para qualquer usuário da comunidade)

E mais! Esta API serve um ambiente da comunidade de HxH RPG, com um espaço para os usuários discutirem:
- Regras
- Teorias
- Habilidades
- Notícias
- Ideias
- Dúvidas
- dentre outros...

Além de promover uma constante atualização do HxH RPG System com base nas discussões da comunidade, fornece essas próprias regras do sistema, além de muitas outras funcionalidades que estão por vir!

### Motivação

A razão por este projeto existir é o simples fato de eu ter aprendido a programar para construí-lo. Ou melhor, aprendi a programar para resolver problemas de criação de ficha de NPCs baseado no HxH RPG System que eu tinha desenvolvido para jogar com meus amigos num mundo mais próximo do que é apresentado em Hunter X Hunter (o mais canônico possível).

Demorava cerca de 4~5 horas para calcular e validar os resultados de fichas de NPCs mais fortes, então aprendi C e criei uma calculadora para isso. O projeto cresceu e se tranformou em um gerenciador de fichas e combates, que mais tarde ganhou um rework em Java, junto de uma GUI (com Java Swing).

Nesse momento apenas o mestre tinha acesso ao sistema e inseria as ações dos personagens de jogadores e NPCs, junto dos resultados de dados rolados na mesa, pois eu não sabia como colocar online para os próprios jogadores inserirem diretamente as ações de seus personagens através de seus smartphones (em jogos presenciais) ou computadores (em jogos que aconteciam online via Discord).

Tudo era apenas um hobby, mas ao longo do processo me apaixonei pela área e tranquei Engenharia Civil na Universidade Federal Fluminense para me tornar um desenvolvedor. Hoje, tenho o orgulho e satisfação de poder apresentar o início desse grande projeto, que tenho a ambição de transformar numa comunidade apaixonada por Hunter X Hunter e RPG!

</br>

## Início rápido

Clone o repositório e siga a lista de instruções para instalar as dependências, preparar o banco de dados e rodar a aplicação localmente no modo de desenvolvimento.

```bash
git clone https://github.com/422UR4H/HxH_RPG_Environment_API
cd HxH_RPG_Environment_API
npm install
```

Crie um arquivo .env seguindo o .env.example para conectar o servidor no banco de dados.

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public
JWT_SECRET=your_md5_hash_here
PORT=3000
```

Por fim, execute:

```bash
npx prisma migrate dev
npm run start:dev
```

</br>

## Uso da API

### Como funciona?

Possui as entidades: `auth`, `user`, `character` e `profile` por enquanto.

As características destas entidades estão nos arquivos `create-entity.dto.ts`.
Mas seus modelos estão em `prisma/schema.prisma`.

### Rotas:

- GET `/health`: Para pegar o estado da API

- POST `/sign-up`: Para criar uma conta de usuário com o body:

```yml
{
  "nick": "playertest",
  "email": "test@mail.com",
  "password": "a1234567",
  "role": "PLAYER" # ou "MASTER" ou "ASSISTANT"
}
```

- POST `/sign-in`: Para fazer login com o body:

```yml
{
  "email": "test@mail.com",
  "password": "a1234567"
}
```

As rotas abaixo são todas autenticadas

- POST `/profiles`: Para receber informações da conta com o body:

```yml
{
  "name": "test da silva",
  "birthday": "1999-12-31",
  "briefDescription": "I am a test example", # não obrigatório
  "description": "Lorem ipsum dolor sit amet, consectetur adip...", # não obrigatório
  "avatarUrl": "string", # não obrigatório
  "backgroundImgUrl": "string" # não obrigatório
}
```

- GET `/users/profiles`: Para receber informações de usuário e perfil

- DELETE `/users/:id`: Para deletar completamente um usuário

- POST `/characters`: Para criar um personagem com o body:

```yml
{
  "nick": "chartest",
  "name": "character test",
  "birthday": "1999-09-30",
  "briefDescription": "I am a test example", # não obrigatório
  "description": "Lorem ipsum dolor sit amet, consectetur adip...", # não obrigatório
  "avatarUrl": "https://randomuser.me/api/portraits/women/23.jpg", # não obrigatório
  "backgroundImgUrl": "https://randomuser.me/api/portraits/women/24.jpg" # não obrigatório
}
```

- GET `/characters/:id`: Para receber informações de personagem e seu perfil

- GET `/characters/:id/attribute-test`: Para fazer um teste de atributo (retorna um número de 1 a 20 - por enquanto)
* Obs.: essa rota usa a entidade Dado (Dice) para fazer um teste realmente aleatório ao invés de depender dos números pseudo-aleatórios gerados por sequências previsíveis no computador.

Se a estrutura não for respeitada, um erro 400 será retornado.

</br>

# Tecnologias usadas

Para este projeto, utilizo:

- Node (versão 18.17.0);
- Nest.js com Express;
- TypeScript;
- PrismaORM;
- PostgreSQL;
- Jest;
- Faker (... em progresso);
- ESLint;
- Prettier;

</br>

## Testes

### Manual

A estrutura das rotas está pronta em uma coleção ThunderClient (thunder-collection_hxh-rpg-environment.json) para testes manuais.

### Automatizados

É recomendado utilizar outro banco local para testes automatizados.

Obs.: os testes automatizados ainda estão sendo implementados

Crie um arquivo .env.test seguindo o arquivo .env.example e insira a URL do banco de dados de teste para executar os testes automatizados.

Por fim, para rodar os testes, execute:

```bash
# para preparar o banco de dados de teste
npm run test:migrate
# para testes de integração
npm run test:e2e
# ou rode ambos juntos
npm run test:migrate:e2e

# para testes unitários
npm run test
# ou para testar uma funcionalidade específica:
npm run test <feat>
# exemplo:
npm run test characters
```
