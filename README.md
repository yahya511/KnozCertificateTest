<div align="center">
  <img src="public/assets/logo.jpeg" alt="Knoz Academy Logo" width="150" style="border-radius: 50%; box-shadow: 0 4px 14px 0 rgba(0,0,0,0.1);" />
  
  <h1>🎓 Knoz Academy - Certificate Management System</h1>
  
  <p>
    <strong>A highly secure, elegant, and modern certificate generation and verification platform.</strong>
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#codebase-deep-dive">Codebase Deep Dive</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

<hr>

## ✨ Features

- **🎨 Multi-Template System:** Generate beautifully crafted certificates with unique Islamic/Quranic, Elegant, and Classic designs.
- **🔐 Secure Verification:** Built-in QR code scanning and direct URL verification that fetches real-time data from the Knoz Academy backend.
- **🖨️ High-Resolution Export:** Export certificates flawlessly to A4-sized PDFs or print them directly using `html2canvas` and `jsPDF`.
- **🌍 Multilingual UI:** Seamless toggling between LTR (English) and RTL (Arabic) with persistent settings.
- **⚡ Vercel Serverless Backend:** Securely proxies API requests to hide sensitive authentication credentials from the client-side.

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | `Angular 21` (Zoneless) | State-of-the-art SPA architecture using Signals. |
| **Styling** | `Tailwind CSS 4` | Utility-first CSS framework for rapid, responsive UI design. |
| **Backend / API** | `Vercel Serverless (Node.js)` | Secure `verify.js` function to proxy Knoz API requests. |
| **PDF Generation** | `jsPDF` & `html2canvas` | Client-side rendering of DOM elements into high-quality PDFs. |
| **Icons** | `FontAwesome` | Scalable vector icons for the user interface. |

---

## 🏗 Architecture & Security

The system is designed as a **Static Single Page Application (SPA)** deployed on Vercel, decoupled from a traditional backend server, yet highly secure.

### The Security Problem & Solution
The Knoz API (`knoz-api.knoz.online`) requires a username and password to generate a Bearer token. Exposing these credentials in the Angular frontend (`environment.ts`) would be a massive security risk. 
**Solution:** We utilize Vercel Serverless Functions. The Angular frontend sends a simple `sspId` to our own `/api/verify` endpoint. The serverless function (which safely holds the credentials in Environment Variables) authenticates with the Knoz API, fetches the student's course details, and returns the clean data to the frontend.

---

## 📂 Codebase Deep Dive

Understanding the directory structure is key to maintaining the application. Here is a detailed breakdown of the codebase:

```text
knoz-academy/
├── api/
│   └── verify.js                 # 🔒 Vercel Serverless Function (Handles API Proxy & Auth)
├── public/                       # 🖼️ Static assets (Fonts, Logos, Images)
├── src/
│   ├── app/
│   │   ├── core/                 # ⚙️ Singleton Services & Interceptors
│   │   │   ├── interceptors/     # (e.g., auth.interceptor.ts)
│   │   │   └── services/         # API logic (settings.service.ts, verification.service.ts)
│   │   ├── features/             # 🌟 Main Application Modules (Lazy Loaded)
│   │   │   ├── certificate-preview/  # Certificate rendering engine
│   │   │   │   ├── components/       # The 3 Templates (Classic, Elegant, Quran)
│   │   │   │   ├── certificate-preview.ts   # Core logic for PDF/Print generation
│   │   │   ├── dashboard/            # Admin statistics and charts
│   │   │   ├── settings/             # System configuration (Signer name, Language)
│   │   │   └── verification/         # Public-facing certificate verification page
│   │   └── layout/               # 🧩 App Shell (Sidebar, Navbar)
│   ├── environments/             # 🌐 Environment configs (Git-ignored for security)
│   ├── index.html                # 📄 Main entry point
│   ├── main.ts                   # 🚀 Angular Bootstrap (Zoneless config)
│   └── styles.css                # 🎨 Global Tailwind imports
└── vercel.json                   # ⚙️ Vercel Routing Configuration
```

### 🧩 Core Modules Explained

#### 1. Certificate Preview Engine (`features/certificate-preview`)
This is the heart of the application. It dynamically loads one of three templates based on user selection.
- **Logic:** It utilizes Angular Signals to pass the `certificate` object down to the child components (`<app-quran-certificate>`, etc.).
- **PDF Generation (`downloadCertificate`):** We use `html2canvas` with a `scale: 3` configuration. This forces the browser to take a highly detailed snapshot of the HTML element, which is then injected into `jsPDF` formatted as a landscape A4 page.

#### 2. Settings Management (`core/services/settings.service.ts`)
A service that manages persistent user preferences using `localStorage`. It stores the default template, the system language (ar/en), and the default signer's name (e.g., *Yahya Husseiny*), instantly reacting to changes across the app using Angular Signals.

#### 3. Vercel Serverless API (`api/verify.js`)
This Node.js function catches POST requests at `/api/verify`. It reads `process.env.KNOZ_API_USERNAME` and `PASSWORD`, executes the login flow to the external Knoz API, extracts the JWT token, and fetches the student's data using the provided `sspId`.

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the project on your local machine:

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/knoz-certificate-verification.git

# Navigate to the directory
cd knoz-certificate-verification

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Knoz API credentials:
```env
KNOZ_API_USERNAME=your_username_here
KNOZ_API_PASSWORD=your_password_here
```

### 4. Running the Development Server
```bash
# Start the Angular development server
npm run dev
```
*Note: To test the `/api/verify` Serverless function locally, you may need to use Vercel CLI (`vercel dev`).*

---

## ☁️ Deployment (Vercel)

This project is optimized for a zero-config deployment on Vercel.

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your GitHub repository.
4. **CRITICAL:** Before clicking Deploy, go to **Environment Variables** and add:
   - `KNOZ_API_USERNAME`
   - `KNOZ_API_PASSWORD`
5. Click **Deploy**. Vercel will automatically detect the Angular SPA structure and the `api/` folder.

> **Routing Note:** The `vercel.json` file ensures that all frontend routes redirect to `index.html` preventing 404 errors on page refresh, while perfectly preserving the `/api/*` routes for the backend.

---
<div align="center">
  <i>Developed with ❤️ for Knoz Academy</i>
</div>
