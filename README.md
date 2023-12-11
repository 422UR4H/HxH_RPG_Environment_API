# HxH_RPG_Environment_API

A RESTful API with Domain-Driven Modeling built in TypeScript and Nest.js for the HxH_RPG_Environment Web App.

## Description

This is an ever-expanding Node.js Web Service created to foster a Hunter X Hunter RPG community. Uses the JavaScript/TypeScript ecosystem in Nest.js with Express.js, PrismaORM with PostgreSQL for the database, Jest with Supertest and Faker for automated testing, ESLint and Prettier for code standards. The architecture layers are built based on Clean Architecture and Hexagonal Architecture.

## Demo

### Deploy API link: https://betify-api.onrender.com

<br />

## About

The main functionalities that this API serves for the management system include:
- User account creation (player, master and assistant)
- Character creation
- Nen Skills creation
- Character training and evolution system
- Character evolution simulation
- PvP match manager
- Creation and management of scenarios and campaigns
- Creation and management of matches with masters and players
- Publication of campaigns and public matches (for any user in the community)

And more! This API serves an HxH RPG community environment, with a space for users to discuss:
- Rules
- Theories
- Skills
- News
- Ideas
- Doubts
- among others...

In addition to promoting a constant update of the HxH RPG System based on community discussions, it provides these system rules themselves, in addition to many other features to come!

### Motivation

The reason this project exists is the simple fact that I learned to program to build it. Or better yet, I learned to program to solve NPC file creation problems based on the HxH RPG System that I had developed to play with my friends in a world closer to that presented in Hunter X Hunter (as canonical as possible).

It took about 4~5 hours to calculate and validate the results of stronger NPC tokens, so I learned C and created a calculator for that. The project grew and became a chips and combat manager, which later received a rework in Java, along with a GUI (with Java Swing).

At that time, only the master had access to the system and entered the actions of player characters and NPCs, along with the results of dice rolled on the table, as I didn't know how to put it online for the players themselves to directly enter the actions of their characters through their smartphones (in face-to-face games) or computers (in games that took place online via Discord).

Everything was just a hobby, but throughout the process I fell in love with the area and studied Civil Engineering at Universidade Federal Fluminense to become a developer. Today, I am proud and pleased to be able to present the beginning of this great project, which I have the ambition of transforming into a community passionate about Hunter X Hunter and RPG!

</br>

## Quick start

Clone the repository and follow the list of instructions to install the dependencies, prepare the database and run the application locally in development mode.

```bash
git clone https://github.com/422UR4H/HxH_RPG_Environment_API
cd HxH_RPG_Environment_API
npm install
```

Create a .env file following the .env.example to connect the server to a database.

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public
JWT_SECRET=your_md5_hash_here
PORT=3000
```

Finally, run:

```bash
npx prisma migrate dev
npm run start:dev
```

</br>

## API Usage

### How it works?

It has the entities: `auth`, `user`, `character` and `profile` for now.

The characteristics of these entities are in the files `create-entity.dto.ts`.
But your models are in `prisma/schema.prisma`.

### Routers:

- GET `/health`: To get the state of the API

- POST `/sign-up`: To create a user account with body:

```yml
{
  "nick": "playertest",
  "email": "test@mail.com",
  "password": "a1234567",
  "role": "PLAYER" # or "MASTER" or "ASSISTANT"
}
```

- POST `/sign-in`: To log in with body:

```yml
{
  "email": "test@mail.com",
  "password": "a1234567"
}
```

The routes below are all authenticated

- POST `/profiles`: To receive account information with the body:

```yml
{
  "name": "test da silva",
  "birthday": "1999-12-31",
  "briefDescription": "I am a test example", # not required
  "description": "Lorem ipsum dolor sit amet, consectetur adip...", # not required
  "avatarUrl": "string", # not required
  "backgroundImgUrl": "string" # not required
}
```

- GET `/users/profiles`: To receive user and profile information

- DELETE `/users/:id`: To completely delete a user

- POST `/characters`: To create a character with the body:

```yml
{
  "nick": "chartest",
  "name": "character test",
  "birthday": "1999-09-30",
  "briefDescription": "I am a test example", # not required
  "description": "Lorem ipsum dolor sit amet, consectetur adip...", # not required
  "avatarUrl": "https://randomuser.me/api/portraits/women/23.jpg", # not required
  "backgroundImgUrl": "https://randomuser.me/api/portraits/women/24.jpg" # not required
}
```

- GET `/characters/:id`: To receive character information and your profile

- GET `/characters/:id/attribute-test`: To make an attribute test (returns a number from 1 to 20 - for now)
* Note: this route uses the Dice entity to make a truly random test instead of relying on pseudo-random numbers generated by predictable sequences in the computer.

If the structure is not respected, a 422 error is returned.

</br>

# Technologies used

For this project, I used:

- Node (version 18.17.0);
- Nest.js with Express;
- TypeScript;
- PrismaORM;
- PostgreSQL;
- Jest;
- Faker (... in progress);
- ESLint;
- Prettier;

</br>

## Tests

### Manual

The route structure is ready in a ThunderClient collection (thunder-collection_hxh-rpg-environment.json) for manual testing.

### Automatized

It is recommended to use another local database for automated tests.

Note: automated tests are still being implemented

Create a .env.test file following the .env.example file and enter the test database URL to run the automated tests.

Finally, to run the tests, run:

```bash
# to prepare the database test
npm run test:migrate
# to integration tests
npm run test:e2e
# or run both together
npm run test:migrate:e2e

# to unit tests
npm run test
# or to test a specific functionality:
npm run test <feat>
# example:
npm run test characters
```
