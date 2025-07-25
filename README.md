# SecureSight Dashboard

A modern CCTV monitoring dashboard for SecureSight, built with Next.js 15, Prisma, Neon (Postgres), and React Three Fiber.

---

## 🚀 Live Demo

- **Live URL:** [https://secure-sight-dashboard-zyr4.vercel.app/](https://secure-sight-dashboard-zyr4.vercel.app/)
- **Public Repo:** [https://github.com/Cherryga/secure-sight-dashboard](https://github.com/Cherryga/secure-sight-dashboard)

---
## 🖼️ Screenshots
### 🔍 Dashboard Overview
<img width="1919" height="987" alt="Screenshot 2025-07-25 155243" src="https://github.com/user-attachments/assets/b242f4c4-f312-42f6-b035-cf774e20d12c" />

### 🎥 Incident Cards with Video Previews
<img width="774" height="536" alt="image" src="https://github.com/user-attachments/assets/28ea8961-96f3-43f3-bd5c-ee0fe817a353" />

### ⏱️ Interactive Timeline Player
<img width="1919" height="329" alt="image" src="https://github.com/user-attachments/assets/4f3b7dd7-90c7-414c-9394-3a826d1bd205" />

### 🧊 Optional 3D Camera View
<img width="1913" height="901" alt="image" src="https://github.com/user-attachments/assets/143d6250-6fb7-4452-a5c8-d37b4b964c73" />


## 🗄️ Environment Variables

Create a `.env` file in your project root with:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>?sslmode=require
```
- (Use your Neon Postgres connection string here.)

---

## 🛠️ Deployment Instructions

1. **Clone the repo:**
   ```sh
   git clone https://github.com/cherryygargg/secure-sight-dashboard.git
   cd secure-sight-dashboard
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up your database:**
   - Create a Neon Postgres database.
   - Copy your connection string to `.env` as `DATABASE_URL`.

4. **Run migrations and seed data:**
   ```sh
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Start the development server:**
   ```sh
   npm run dev
   ```

6. **Deploy:**
   - Push to GitHub.
   - Import the repo on [Vercel](https://vercel.com/)
   - Add your `DATABASE_URL` in the dashboard’s Environment Variables.
   - Deploy!

---

## 🧑‍💻 Tech Decisions

- **Next.js 15 App Router:** Modern, file-based routing and React Server Components.
- **Prisma ORM:** Type-safe database access and easy migrations.
- **Neon (Postgres):** Free, serverless Postgres for easy cloud DB.
- **Tailwind CSS:** Rapid, utility-first styling.
- **React Three Fiber:** For 3D/extra credit section.
- **Optimistic UI:** Incident resolve is instant and smooth.
- **API routes:** RESTful, using Next.js App Router conventions.

---

## 📸 Features

- **Navbar:** Clean, modern, Figma-accurate.
- **Incident Player:** Large video frame, camera thumbnails.
- **Incident List:** Thumbnails, colored icons, camera location, time, resolve button with optimistic UI.
- **Timeline:** Interactive, full-width, Figma-style.
- **3D Route:** React Three Fiber demo at `/3d`.
- **Seeded Data:** 3+ cameras, 12+ incidents, 3+ types, 24h span, local images.

---

## 💡 If I Had More Time...

- Add authentication and user roles.
- Full test coverage (unit, integration, e2e).
- Accessibility and mobile responsiveness polish.
- Admin dashboard for camera/incident management.
- More granular incident filtering and search.
- Improve accessibility (WCAG standards) and mobile responsiveness.

---

## 📝 Notes

- **.env** is required for database connection.
- Incident media assets:
  - Images: `/public/incidents/`
  - Placeholder video: `/public/static/`
    
---

**Thank you for reviewing!**
