# Secret Santa Assignment "JingleDraw"

> By Paulino Torres Jiménez

## Preface

This project is a solution to the Secret Santa assignment, designed to meet the following constraints:

- A person cannot be their own Secret Santa.
- A family member can only be paired with the same Secret Santa once every three years.
- Immediate family members cannot select other members of their immediate family.

This repository contains both the backend and frontend components of the application.

## Backend

The backend application is built using Hono.js, TypeScript, Knex, and MySQL, and it runs on port 3010 using the Bun runtime.

### Prerequisites

- [Bun](https://bun.sh/docs/installation)

1. Navigate to the `backend` directory:

```sh
cd backend
```

2. Install dependencies:

```sh
bun install
```

3. Create a `.env` file under the 'backend' folder:

```sh
RAILWAY_MYSQL_HOST=
RAILWAY_MYSQL_USER=
RAILWAY_MYSQL_PORT=
RAILWAY_MYSQL_PASSWORD=
RAILWAY_MYSQL_DATABASE=
```

4. Run on [http://localhost:3010](http://localhost:3010)

```sh
bun run dev
```

## Frontend

The frontend application is built using Next.js 14 and runs on Node.js.

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/)

1. Navigate to the `frontend` directory:

```sh
cd frontend
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file under the 'frontend' folder: (optional)

```sh
NODE_ENV=
```

4. Run on [http://localhost:3020](http://localhost:3020)

```sh
npm run start
```

5. Build project

```sh
npm run build
```

6. Start project

```sh
npm run start
```
