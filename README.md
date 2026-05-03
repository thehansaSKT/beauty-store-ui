# Beauty Store UI 

## Project Overview
This is a third semester GUI project developed using Vue.js and Vite.  
The application is a simple e-commerce frontend for beauty and fragrance products.

Users can browse products, search items, add products to the cart, and switch between dark and light mode. The application is fully responsive for mobile, tablet, and desktop devices.

---

## Features
- Product listing (Beauty & Fragrance categories)
- Product search functionality
- Shopping cart system
- Cart persistence using localStorage
- Dark / Light mode toggle
- Responsive design (Mobile, Tablet, Desktop)
- Mobile hamburger navigation menu
- Login / Logout UI
- Dynamic product preview in navbar

---

## Technologies Used
- Vue.js
- Vite
- Pinia
- Vue Router
- TypeScript
- Tailwind CSS

---

## Responsive Design
The project is fully responsive using Tailwind CSS Flex and Grid classes.

- **Mobile:** Hamburger menu and stacked layout
- **Tablet:** Flexible responsive layout
- **Desktop:** Full navigation and multi-column layout

---

# Installation & Setup Instructions

## 1. Install Dependencies
Run the following command to install all required packages:

```bash
npm install
```

---

## 2. Run the Development Server
Start the project locally using:

```bash
npm run dev
```

---

## 3. Open the Application
After running the server, open the following URL in your browser:

```txt
http://localhost:5173
```

---

## 4. Build for Production
To create a production build, run:

```bash
npm run build
```

---

## Notes
- This project uses localStorage for cart persistence.
- This is a frontend-only GUI project.
- Product data is fetched from:
  https://dummyjson.com/products