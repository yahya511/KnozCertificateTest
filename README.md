<div align="center">
  <img src="assets/logo.jpeg" alt="Knoz Academy Logo" width="120" style="border-radius: 20px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" />
  <h1>🎓 Knoz Academy | أكاديمية كنوز</h1>
  <h3>Professional Certificate Management System <br> نظام احترافي لإدارة الشهادات</h3>
</div>

---

## 🌟 Overview | نبذة عن المشروع

**🇬🇧 English:**
Knoz Academy is a premium, full-stack web application built to streamline the generation, management, and distribution of student certificates. Featuring a highly polished, responsive interface, the system allows administrators to seamlessly create customized certificates, preview them in real-time, and export them as high-quality PDFs or Images. The platform is fully bilingual, supporting seamless English (LTR) and Arabic (RTL) localization.

**🇸🇦 العربية:**
أكاديمية كنوز هي منصة ويب متكاملة وعالية الاحترافية، صُممت لتسهيل إنشاء وإدارة وإصدار شهادات الطلاب. تتميز المنصة بواجهة مستخدم عصرية ومتجاوبة، تتيح للمسؤولين إنشاء شهادات مخصصة بسهولة، ومعاينتها في الوقت الفعلي، وتصديرها بجودة عالية كملفات PDF أو صور. النظام ثنائي اللغة بالكامل، ويدعم التبديل السلس بين اللغتين العربية (RTL) والإنجليزية (LTR).

---

## ✨ Core Features | المميزات الرئيسية

### 🛠️ 1. Dynamic Certificate Generation (توليد الشهادات ديناميكياً)
- **EN:** Real-time certificate preview with customizable fields (Student Name, Course, Date, Grade).
- **AR:** معاينة حية للشهادة مع حقول قابلة للتخصيص (اسم الطالب، الدورة، التاريخ، التقدير).
- **EN:** Integrated QR Code generation for real-time certificate verification.
- **AR:** دمج تلقائي لرموز الاستجابة السريعة (QR Code) للتحقق من مصداقية الشهادة.
- **EN:** Pixel-perfect export to **PDF** and **PNG** formats optimized for A4 landscape printing.
- **AR:** تصدير فائق الدقة بصيغتي **PDF** و **PNG** مُجهز برمجياً للطباعة الاحترافية بحجم A4 الأفقي.

### 🌍 2. Bilingual & RTL/LTR Architecture (هيكلة ثنائية اللغة)
- **EN:** Deeply integrated localization engine switching dynamically between English and Arabic.
- **AR:** محرك ترجمة مدمج للتبديل الفوري والديناميكي بين العربية والإنجليزية.
- **EN:** Automatic layout mirroring (RTL/LTR) without page reloads using Tailwind CSS logical properties.
- **AR:** انعكاس تلقائي لاتجاه الواجهات (من اليمين لليسار والعكس) بدون الحاجة لإعادة تحميل الصفحة.

### 📊 3. Executive Dashboard & User Profile (لوحة التحكم والملف الشخصي)
- **EN:** A modern, widget-based dashboard providing quick insights into active students and total issued certificates.
- **AR:** لوحة تحكم عصرية تقدم إحصائيات سريعة عن الطلاب والدورات والشهادات المُصدرة.
- **EN:** A beautiful user profile featuring vertical Bento-styled cards, smart avatar initials extraction, and crisp SVG country flags.
- **AR:** ملف شخصي جذاب يعرض البيانات بنمط البطاقات الرأسية الملونة بألوان هادئة، مع استخراج ذكي لأول حرفين كصورة شخصية، وعرض فائق الدقة لأعلام الدول.

---

## 🏗️ Architecture & Tech Stack | البنية التقنية

**Frontend (واجهة المستخدم):**
*   **Framework:** Angular (v21+) - Standalone Components, Signal-based reactivity.
*   **Styling:** Tailwind CSS (v4) - Utility-first styling with built-in dark/light & RTL support.
*   **Icons:** FontAwesome (v6.5) & SVG flags via global APIs.
*   **Export Engine:** `html-to-image` & `jspdf` for pristine document capture.

**Backend & Tooling (الخادم والأدوات):**
*   **Server:** Node.js / Express.js (API serving and SSR logic).
*   **Build System:** Vite / ESBuild via Angular CLI.

---

## 📁 Project Structure | الهيكلة التنظيمية

```text
knoz-academy/
├── public/                  # Static assets (Images, Logos)
├── src/
│   ├── app/
│   │   ├── core/            # Core singletons: Services, Models, Guards, Dictionary
│   │   ├── features/        # Feature modules (Dashboard, Certificates, Profile, Settings)
│   │   ├── layout/          # Layout wrappers (Sidebar, Topbar, Main Layout)
│   │   └── shared/          # Reusable UI components (Buttons, Modals, Inputs)
│   ├── styles.css           # Global Tailwind & Print configuration
│   ├── server.ts            # Express server (Full-stack SSR entry point)
│   └── index.html           # HTML application shell
└── angular.json             # Workspace build configuration
```

---

## 🚀 Getting Started | دليل التشغيل

### Prerequisites (المتطلبات الأساسية)
- Node.js (v18 or higher)
- npm

### Installation (التثبيت)

**🇬🇧 EN:**
1. Clone the repository.
2. Run `npm install` to install project dependencies.
3. Run `npm run dev` to start the development server.
4. Open your browser and navigate to `http://localhost:3000`.

**🇸🇦 AR:**
1. قم باستنساخ المستودع (Clone).
2. نفّذ الأمر `npm install` لتثبيت الحزم المعتمدة.
3. نفّذ الأمر `npm run dev` لتشغيل خادم التطوير.
4. افتح المتصفح وتوجه إلى الرابط `http://localhost:3000`.

---
<div align="center">
  <i>Crafted with precision for modern educational standards. <br> تم تصميمه بإتقان ليواكب أعلى المعايير التعليمية الحديثة.</i>
</div>
