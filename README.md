# VitalArc — Next.js Full-Stack Edition 🌲⚡

A premium, immersive fitness application built with the "Cyber-Forest" (Electric Nature) design theme. Migrated from vanilla HTML/JS to a modern Next.js stack.

## 🚀 Built With
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Visuals**: [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Backend / Auth**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **AI Integration**: [Gemini Pro](https://deepmind.google/technologies/gemini/)
- **Icons**: [Lucide React](https://lucide.dev/)

## ✨ Key Features
- **3D Cyber-Forest Dashboard**: Immersive background that reacts to the environment.
- **Dynamic Routine Generator**: Logic-driven workout plans tailored to your goal, level, and schedule.
- **Advanced Exercise Library**: Categorized exercises with expert tips and instructions.
- **Full-Stack Prepared**: Ready-to-use API routes for Stripe payments and Gemini AI coaching.
- **Typesafe Data Layer**: Robust exercise and routine templates in TypeScript.

## 📂 Project Structure
- `/app`: Core pages and layouts (Dashboard, Routines, Exercises, Progress, Nutrition).
- `/app/api`: Serverless API routes for Stripe and Gemini.
- `/components`: Reusable UI components (Sidebar, HeroScene).
- `/data`: Centralized fitness data and generation logic.
- `/lib`: Helper utilities and third-party client initializations (Supabase).

## 🛠️ How to Run (Local / Replit)
1. **Clone/Download** the files.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**: 
   Update `.env.local` with your Supabase, Stripe, and Gemini keys.
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. **Open**: [http://localhost:3000](http://localhost:3000)

## 🌲 Design Tokens
- **Primary Background**: `#06110b`
- **Neon Accent**: `#39ff14` (Neon Lime)
- **Electric Accent**: `#00ffff` (Electric Cyan)
- **Secondary Text**: `#8bba9b` (Forest Green)

---
*Built with dedication for the VitalArc Fitness Community.*
