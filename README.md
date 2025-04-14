# Quasar Books (QBooks) 📚

Welcome to **Quasar Books** — You can sign up, log in, and browse books by genre, author, or popularity. When you find something you like, just add it to your cart and place the order. You’ll get a confirmation, and you can always check your order history later.

There’s also an admin panel where books can be added or updated, inventory is managed, and orders are tracked in real time.

It's a unique online library experience where users can explore, read, and purchase books from an extensive, hand-picked collection that inspires, captivates, and enlightens. Built with a sleek, modern UI, QBooks emphasizes readability, elegance, and ease of use.

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

---

## 📚 Project Overview

**Quasar Books (QBooks)** is a digital bookstore that allows users to:

- Explore a vast collection of books
- View detailed information about each title
- Manage a cart and place orders
- Authenticate with secure JWT-based login
- Enjoy a smooth, responsive UI experience across devices

The app's front-end prioritizes user experience through dynamic visuals and intuitive navigation.

Home Page
![Alt text](/Output-screenshots/ss1.png?raw=true "home page")
![Alt text](/Output-screenshots/ss2.png?raw=true "home page")


---

## 🚀 Features

✅ **Discover Books** — Curated library with title, author, language, and price  
✅ **Book Details View** — High-res covers with full descriptions  
✅ **Responsive Design** — Mobile-friendly layouts  
✅ **Smooth Navigation** — Fast, single-page routing  
✅ **User Authentication** — Secure sign-up/sign-in using JWT  
✅ **Favorites & Cart** — Manage your favorite reads and shopping cart  
✅ **Admin Features** — Add, update, and delete books (role-based access)

🛠 **Coming Soon**  
- 📖 Built-in Ebook Reader  
- 💳 Stripe-based Payments

---

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/shreying/QMERN-store.git
cd QMERN-store
```

### Install Frontend Dependencies
```bash
npm install
```

### Start the Development Server
```bash
npm run dev
```
### Backend Setup
-Set up the Express.js server
-Configure MongoDB database
-Ensure routes for authentication, book handling, cart, orders, and favorites are implemented
```bash
nodemon app.js
```
Refer to the conn folder or API Documentation

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - React Icons for iconography
  - redux toolkit implementation
- **Backend**:
  - Express.js
  - Axios for API requests
- **Database**:
  - MySQL or Prisma (if Prisma-based backend setup is used)
- **Others**:
  - React Router for page navigation


## Contributing

We welcome contributions! Please submit a pull request, and for major changes, open an issue to discuss any modifications.

1. **Fork the repository**
2. **Create your branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to the branch** (`git push origin feature/new-feature`)
5. **Open a pull request**

---

> repo-link: (https://github.com/shreying/QMERN-store)

---
