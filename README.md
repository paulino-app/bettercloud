# Secret Santa Assignment "JingleDraw"

> By Paulino Torres Jiménez

## Preface

This project is a solution to the Secret Santa assignment, designed to meet the following constraints:

- A person cannot be their own Secret Santa.
- A family member can only be paired with the same Secret Santa once every three years.
- Immediate family members cannot select other members of their immediate family.

This repository contains both the backend and frontend components of the application.

### You can test both projects under:

Backend:

- [https://api.paulino.app](https://api.paulino.app)

Frontend:

- [https://jingledraw.paulino.app](https://jingledraw.paulino.app)

## Frontend

The frontend application is built using React and Next.js as a framework and runs on Node.js.

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [npm](https://www.npmjs.com/)

### Installation

1. Navigate to the `frontend` directory:

```sh
cd frontend
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file under the `frontend` folder: (optional)

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

## Backend

The backend application is built using Hono.js, TypeScript, Knex, and MySQL, and it use Bun as a runtime.

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
- [MySQL](https://www.mysql.com/)

### Installation

1. Navigate to the `backend` directory:

```sh
cd backend
```

2. Install dependencies:

```sh
bun install
```

3. Create a `.env` file under the `backend` folder: (you can find the variables in the figma project)

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

## Routes

### Root

- GET /
  - **Description:** Returns a greeting message.
  - **Response:** `Hello BetterCloud!`

### Family Routes

- GET /family

  - **Description:** Get all families.
  - **Response:** JSON array of all families.

- POST /family

  - **Description:** Create a new family.
  - **Request Body:**
    ```json
    {
      "name": "Family Name"
    }
    ```
  - **Response:** JSON object of the created family.

- DELETE /family

  - **Description:** Delete a family.
  - **Request Body:**
    ```json
    {
      "id": "Family ID"
    }
    ```
  - **Response:** Status message.

- PUT /family
  - **Description:** Update family name.
  - **Request Body:**
    ```json
    {
      "id": "Family ID",
      "name": "New Family Name"
    }
    ```
  - **Response:** JSON object of the updated family.

### Group Routes

- GET /group

  - **Description:** Get all groups.
  - **Response:** JSON array of all groups.

- GET /group/:groupId

  - **Description:** Get a group by ID.
  - **Response:** JSON object of the group.

- GET /group/session/:session

  - **Description:** Get a group by session.
  - **Response:** JSON object of the group.

- POST /group

  - **Description:** Create a new group.
  - **Request Body:**
    ```json
    {
      "name": "Group Name",
      "organizerId": "Organizer ID",
      "moneyLimit": "Money Limit USD",
      "theme": "Group Theme"
    }
    ```
  - **Response:** JSON object of the created group.

- POST /group/member

  - **Description:** Add a member to a group.
  - **Request Body:**

    ```json
    {
      "groupId": "Group ID",
      "memberId": "Member ID"
    }
    ```

  - **Response:** Status message.

- DELETE /group/member

  - **Description:** Delete a member from a group.
  - **Request Body:**
    ```json
    {
      "groupId": "Group ID",
      "memberId": "Member ID"
    }
    ```
  - **Response:** Status message.

- DELETE /group
  - **Description:** Delete a group.
  - **Request Body:**
    ```json
    {
      "id": "Group ID"
    }
    ```
  - **Response:** Status message.

### Member Routes

- GET /member

  - **Description:** Get all members.
  - **Response:** JSON array of all members.

- GET /member/family/:familyId

  - **Description:** Get members by family ID.
  - **Response:** JSON array of members in the family.

- GET /member/group/:groupId

  - **Description:** Get members by group ID.
  - **Response:** JSON array of members in the group.

- GET /member/group/session/:session

  - **Description:** Get members by group session.
  - **Response:** JSON array of members in the group session.

- GET /group/:groupId/members-not-in-group

  - **Description:** Get members not in a group.
  - **Response:** JSON array of members not in the group.

- POST /member

  - **Description:** Create a new member.
  - **Request Body:**
    ```json
    {
      "name": "Member Name",
      "familyId": "Family ID"
    }
    ```
  - **Response:** JSON object of the created member.

- POST /member/group

  - **Description:** Create a member and add to a group.
  - **Request Body:**
    ```json
    {
      "familyId": "Family ID",
      "groupId": "Group ID",
      "name": "Member Name",
      "photo": "Member Photo",
      "description": "Member Description",
      "email": "Member Email",
      "phone": "Member Phone"
    }
    ```
  - **Response:** JSON object of the created member.

- PUT /member

  - **Description:** Update member details.
  - **Request Body:**
    ```json
    {
      "id": "Member ID",
      "familyId": "New Family ID",
      "name": "New Member Name",
      "photo": "Ne wMember Photo",
      "description": "Ne wMember Description",
      "email": "New Member Email",
      "phone": "New Member Phone"
    }
    ```
  - **Response:** JSON object of the updated member.

- DELETE /member
  - **Description:** Delete a member.
  - **Request Body:**
    ```json
    {
      "id": "Member ID"
    }
    ```
  - **Response:** Status message.

### Secret Santa Routes

- GET /reveal-results/:groupId

  - **Description:** Reveal Secret Santa results for a group.
  - **Response:** JSON array of Secret Santa assignments.

- POST /assign-santa
  - **Description:** Assign Secret Santas.
  - **Request Body:**
    ```json
    {
      "groupId": "Group ID"
    }
    ```
  - **Response:** Status message.
