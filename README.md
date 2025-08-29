# EcommerceUsingMERNStack – Frontend

Live Preview: [nodekart.vercel.app](https://nodekart.vercel.app/)

A React-based frontend for a MERN-stack e-commerce platform built with Vite, featuring modern tools and libraries for fast development and a polished user experience.

###  Stack & Key Libraries

- **React.js** (via Vite) – Front-end library for UI.
- **Vite** – Rapid development environment with HMR.
- **Zustand** – Lightweight global state management.
- **React Router** – Routing solutions.
- **Axios** – HTTP client for API interactions.
- **Stripe.js** – Payment processing integration.
- **Recharts** – Data visualization for dashboards.
- **Nodemailer (frontend use?)** – Possibly used for triggering email flows via backend.
- **Cloudinary** – For image upload/display.
- **Hot-Reload** – Built-in via Vite for fast development iterations.
- **Tailwind CSS** – Utility-first CSS for styling (inferred from configs).

  Image
  <img width="2557" height="1335" alt="Screenshot 2025-06-29 190833" src="https://github.com/user-attachments/assets/3a1f99bf-6e3a-4405-8641-1a66e13585ef" />
   <img width="2553" height="1331" alt="Screenshot 2025-06-29 190847" src="https://github.com/user-attachments/assets/fe6d2f91-f835-4274-8219-a8bc65e50f12" />
   <img width="2559" height="1151" alt="Screenshot 2025-06-29 190859" src="https://github.com/user-attachments/assets/12b6f5c3-eeb0-4034-93ea-9c4f4963c9b9" />
   <img width="2557" height="1338" alt="Screenshot 2025-06-29 190913" src="https://github.com/user-attachments/assets/cd403e10-3f8d-42c6-9b1c-f3418ecc0a6d" />
  <img width="2529" height="1333" alt="Screenshot 2025-06-29 191037" src="https://github.com/user-attachments/assets/aa351a0a-7d76-4e60-b9ac-10c546571dbf" />
  <img width="2527" height="1332" alt="Screenshot 2025-06-29 191050" src="https://github.com/user-attachments/assets/b95a80bd-f430-4e76-8728-9a7cd505ff44" />
   <img width="2523" height="1333" alt="Screenshot 2025-06-29 191201" src="https://github.com/user-attachments/assets/e85d9c51-fdb1-4552-9e71-237ec2e1601e" />
   <img width="2526" height="1330" alt="Screenshot 2025-06-29 191218" src="https://github.com/user-attachments/assets/2fd7ee43-ad11-45ae-b43e-89a931bf9bc1" />
   <img width="2559" height="1335" alt="Screenshot 2025-06-29 191303" src="https://github.com/user-attachments/assets/beea572a-4724-4a89-9b2a-2afdbfcc712b" />


###  Features

- Responsive product browsing.
- Cart management with Zustand.
- Checkout flow integrated with Stripe.
- Dynamic dashboard visuals with Recharts.
- User authentication and order management.
- Image handling via Cloudinary.
- Fast refresh with HMR in development.

###  Project Structure

/src
/components — Reusable UI components
/pages — Route-level components (Home, Product, Cart, Dashboard, etc.)
/store — Zustand state slices
/utils — Helpers (API, formatters, etc.)
App.jsx
main.jsx
vite.config.js
tailwind.config.js
package.json
README.md

bash
Copy code

###  Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/VELAGASUBHASH/EcommerceUsingMERNStack-frontend-.git
   cd EcommerceUsingMERNStack-frontend-
Install dependencies:

bash
Copy code
npm install
Create a .env file with:

env
Copy code
VITE_API_BASE_URL=<YOUR_BACKEND_API_URL>
VITE_STRIPE_PUBLIC_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>
VITE_CLOUDINARY_CLOUD_NAME=<your_cloud_name>
VITE_CLOUDINARY_UPLOAD_PRESET=<your_upload_preset>
Run in development:

bash
Copy code
npm run dev
Build for production:

bash
Copy code
npm run build
