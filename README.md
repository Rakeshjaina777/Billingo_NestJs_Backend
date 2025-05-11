# Billingo  🧾

Billingo is a modern and scalable billing software backend built with **NestJS**, supporting both **REST and GraphQL APIs**. It offers a clean architecture, multi-role user support, shop/invoice/item management, PDF/CSV exports, analytics, and background processing with RabbitMQ.

---

## 🚀 Features

- ✅ Shop, User, Item, Invoice, Payment Modules
- ✅ REST & GraphQL APIs
- ✅ JWT Authentication with Role-based Access (Admin, Owner, User)
- ✅ Invoice creation with item selection, stock deduction
- ✅ PDF generation for invoices (Puppeteer)
- ✅ CSV export for reports
- ✅ Shop logo file uploads
- ✅ GraphQL filters, search by customer/date
- ✅ Monthly analytics & top-selling items
- 🔄 RabbitMQ & Redis-based queueing (in progress)

---



## 📁   Architecture diagram

![Billingo_HLD_LLD_Diagram (2)](https://github.com/user-attachments/assets/2a2dd446-a9e4-4a0c-81c0-28ba369852fd)



## 📦 Tech Stack

- **Backend Framework**: NestJS
- **Database**: PostgreSQL (via TypeORM)
- **API Support**: REST & GraphQL (Apollo)
- **Auth**: JWT, Role Guards
- **Queues**: RabbitMQ via `@golevelup/nestjs-rabbitmq`
- **Cache**: Redis via `cache-manager-ioredis`
- **PDF**: Puppeteer
- **CSV**: `json2csv`
- **Upload**: Multer (Local or S3-ready)
- **Email/SMS**: Nodemailer / Twilio (optional)

---

## 📁 Project Structure

```
src/
├── auth/
├── users/
├── shops/
├── items/
├── invoices/
│   └── invoice-item.entity.ts
├── payments/
├── analytics/
├── pdf/
├── export/
├── notifications/
```

---

## ⚙️ Setup Instructions

```bash
# 1. Clone repo
git clone https://github.com/your-org/billingo-backend.git
cd billingo-backend

# 2. Install dependencies
npm install

# 3. Start PostgreSQL, Redis, and RabbitMQ

# 4. Run dev server
npm run start:dev
```

---

## 🚧 Work In Progress

- [ ] RabbitMQ-based email/SMS delivery workers
- [ ] Redis queue monitoring
- [ ] Admin panel APIs (user/shop management)
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Full GraphQL file upload

---

## 📄 License

MIT License © 2025 [Your Name or Org]

---
