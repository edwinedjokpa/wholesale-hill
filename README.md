# 🏗️ Wholesale Hill - Full Stack Engineer Backend Assignment

This project is a backend API built with **NestJS**, **GraphQL**, **TypeORM**, **PostgreSQL**, and **TypeScript**. It features JWT authentication and CRUD operations for managing departments and sub-departments in a hierarchical structure.

---

## 🚀 Features

- 🔐 JWT Authentication
- 🏢 Create Departments with optional Sub-Departments
- 📖 Read all Departments with nested Sub-Departments
- ✏️ Update Department Names
- ❌ Delete Departments (including sub-departments)
- ⚙️ Optional: CRUD for Sub-Departments
- 🌐 Deployed on Render.com

---

## 🧰 Tech Stack

- **NestJS**
- **GraphQL (code-first with @nestjs/graphql)**
- **TypeORM**
- **PostgreSQL**
- **JWT Auth (jsonwebtoken)**
- **Deployed on Render**

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/edwinedjokpa/wholesale-hill.git
cd wholesale-hill
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a PostgreSQL DB

```plaintext
e.g wholesale_hill
```

### 4. Copy and Configure Environment Variables

```plaintext
cp .env.example .env
```

### 5. Migrations

- Running Migrations

```bash
npm run migration:run
```

This will execute all pending migrations on your database, ensuring that your schema is up-to-date.

- Creating Migration

```bash
npm run migration:create --name=CreateTableName
```

This will generate a new migration file in the src/database/migrations/ directory.

- Reverting Migrations

```bash
npm run migration:revert
```

This will undo the most recent migration you used

### 6. Run the Project

```bash
npm run start:dev
```

The GraphQL Playground will be available at:  
👉 `http://localhost:3000/graphql`

---

## 🔐 Authentication

### Registration

```graphql
mutation Register {
  register(
    input: {
      username: "john78"
      email: "johndoe@gmail.com"
      password: "johnyuhugye"
    }
  ) {
    message
  }
}
```

### Login

```graphql
mutation Login {
  login(input: { username: "admin", password: "password" }) {
    message
    data {
      accessToken
    }
  }
}
```

Use the returned `accessToken` in the `Authorization` header for protected routes:

```plaintext
Authorization: Bearer <your_token>
```

### Dashboard

```graphql
query Dashboard {
  dashboard {
    message
    data {
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
    }
  }
}
```

---

## 🧪 Example GraphQL Mutations/Queries

### ➕ Create Department

```graphql
mutation CreateDepartment {
  createDepartment(
    input: {
      name: "Accounting"
      subDepartments: [{ name: "Audit" }, { name: "Finance" }]
    }
  ) {
    message
    data {
      department {
        id
        name
        subDepartments {
          id
          name
        }
      }
    }
  }
}
```

### ➕ Create Department Without Sub-Departments

```graphql
mutation CreateDepartment {
  createDepartment(input: { name: "Accounting", subDepartments: null }) {
    message
    data {
      department {
        id
        name
        subDepartments {
          id
          name
        }
      }
    }
  }
}
```

### 📄 Get All Departments

```graphql
query GetAllDepartments {
  getAllDepartments(limit: null, offset: null) {
    message
    data {
      total
      departments {
        id
        name
        subDepartments {
          id
          name
        }
      }
    }
  }
}
```

### ✏️ Update Department

```graphql
mutation UpdateDepartment {
  updateDepartment(input: { id: "3686r836r-y3838738", name: "Finance" }) {
    message
    data {
      department {
        id
        name
        subDepartments {
          id
          name
        }
      }
    }
  }
}
```

### ❌ Delete Department

```graphql
mutation DeleteDepartment {
  deleteDepartment(id: "3937739r73-ncehie-d33") {
    message
  }
}
```

---

## ☁️ Deployment

- 🔗 **Live API on Render:** [https://wholesale-hill-fzq6.onrender.com/graphql](https://wholesale-hill-fzq6.onrender.com/graphql)

---

## ✅ Bonus (Optional Features Implemented)

- [ ] Sub-department CRUD endpoints
- [x] Pagination on getDepartments

---

## 📄 License

This project is for assessment and demonstration purposes only.

---

## 👋 Contact

Feel free to reach out if you have any questions!
