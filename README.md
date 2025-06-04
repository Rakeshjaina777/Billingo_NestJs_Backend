# 🧾 Billingo — Scalable Billing Software Backend

**Billingo** is a modern and scalable backend for billing systems built with **NestJS**, supporting both **REST** and **GraphQL** APIs. It provides a clean architecture, modular codebase, multi-role access, invoicing, analytics, PDF/CSV exports, and background processing using Redis and RabbitMQ.

---

## 📌 Overview

A secure and modular backend API for managing shops, items, users, invoices, and payments.

Built using:
- ✅ NestJS + TypeORM
- ✅ PostgreSQL, Redis, RabbitMQ
- ✅ REST & GraphQL (Apollo)
- ✅ JWT Authentication with Role Guards
- ✅ PDF (Puppeteer) + CSV (json2csv) Exports
- ✅ Queueing & Background Tasks

---

## 📁   Architecture diagram

![Billingo_HLD_LLD_Diagram (2)](https://github.com/user-attachments/assets/2a2dd446-a9e4-4a0c-81c0-28ba369852fd)



## 🧩 ER Diagram & Schema Design

### 📊 Entity Relationship (Text View)

```
User (1) ────< Invoice >──── (1) Shop
| <InvoiceItem>
|
Item (1)
```

- A user can manage multiple shops  
- A shop has many invoices and items  
- An invoice includes multiple items (via InvoiceItem)  
- Each invoice deducts stock of selected items  

---

### 🔢 TypeORM Entity Sample

```ts
@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Shop)
  shop: Shop;

  @OneToMany(() => InvoiceItem, item => item.invoice)
  items: InvoiceItem[];

  @CreateDateColumn()
  createdAt: Date;
}
```

---

## 🚀 Getting Started — Full Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/billingo-backend.git
cd billingo-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/billingo_db
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
RABBITMQ_URI=amqp://localhost
```

### 4. Set Up PostgreSQL

* Ensure PostgreSQL is running  
* Create a database called `billingo_db`

### 5. Run Migrations (TypeORM)

```bash
npm run typeorm:migration:run
```

### 6. Start Redis & RabbitMQ

```bash
# Redis
redis-server

# RabbitMQ (Docker)
docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### 7. Run Development Server

```bash
npm run start:dev
```

### 8. Access API Docs

- Swagger: `http://localhost:3000/api`  
- GraphQL Playground: `http://localhost:3000/graphql`

---

## 📚 API Documentation

### 🔗 Swagger UI

Visit: [http://localhost:3000/api](http://localhost:3000/api)  
Includes docs for:

* `/auth/login`, `/auth/signup`  
* `/shops`, `/items`, `/invoices`, `/payments`  
* `/analytics/monthly`, `/exports/pdf`, `/exports/csv`

---

## 📦 API Features

### 🔐 Auth

| Endpoint       | Method | Description       |
| -------------- | ------ | ----------------- |
| `/auth/signup` | POST   | Register new user |
| `/auth/login`  | POST   | Login & get JWT   |

### 🏪 Shops & Items

| Endpoint           | Method   | Description        |
| ------------------ | -------- | ------------------ |
| `/shops`           | GET/POST | List / create shop |
| `/items`           | GET/POST | List / create item |
| `/items/:id/stock` | PUT      | Update stock level |

### 🧾 Invoices

| Endpoint            | Method   | Description             |
| ------------------- | -------- | ----------------------- |
| `/invoices`         | GET/POST | Create / view invoices  |
| `/invoices/:id/pdf` | GET      | Download invoice as PDF |

### 💳 Payments

| Endpoint    | Method | Description            |
| ----------- | ------ | ---------------------- |
| `/payments` | POST   | Add payment to invoice |

### 📊 Analytics & Export

| Endpoint             | Method | Description                   |
| -------------------- | ------ | ----------------------------- |
| `/analytics/monthly` | GET    | Monthly revenue & top sellers |
| `/exports/csv`       | GET    | Export reports in CSV         |
| `/exports/pdf`       | GET    | Export PDF summaries          |

---

## 🧪 Sample CURL Requests

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "securepass"}'
```

### Create Shop

```bash
curl -X POST http://localhost:3000/shops \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Tech Store", "logo": "logo.png"}'
```

### Create Invoice

```bash
curl -X POST http://localhost:3000/invoices \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "shopId": "shop-uuid",
    "items": [
      { "itemId": "item-uuid", "quantity": 2 }
    ]
  }'
```



## 🧠 Design Decisions

* ✅ TypeORM over Prisma for full control & migrations  
* ✅ Role-based access via Nest Guards  
* ✅ GraphQL used for advanced filtering and analytics  
* ✅ Redis for caching & queues  
* ✅ RabbitMQ for background jobs (PDF generation, notifications)  
* ✅ Used Puppeteer for pixel-perfect invoice rendering

```---

## 📂 Folder Structure

```
billingo-backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── shops/
│   ├── items/
│   ├── invoices/
│   ├── payments/
│   ├── analytics/
│   ├── export/
│   ├── pdf/
│   ├── notifications/
│   └── common/
├── test/
├── .env
├── Dockerfile
├── docker-compose.yml
├── README.md
```

---
```

## ❤️ Contribute / Extend

* [ ] Add role-based dashboards (Admin, Owner)  
* [ ] Enable file uploads to S3  
* [ ] Implement invoice email notifications  
* [ ] Add GraphQL admin dashboard queries  
* [ ] Unit + E2E tests with Jest

---

## 📄 License

MIT License © 2025 [Your Name or Organization]
