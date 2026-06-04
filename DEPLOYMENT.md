# Dristy Institute - Deployment & Customization Guide

This file provides comprehensive guidelines on running, customizing, and deploying the **Dristy Computer Training Institute** website.

---

## 1. Local Setup Instructions

1. **Install Node.js Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
3. **Open Local Host**:
   Navigate to `http://localhost:3000` in your web browser.

---

## 2. Complete Mapping of Customization Placeholders

All editable texts, numbers, and databases are wrapped in `{/* EDIT: description */}` comments. Here is a list of all customizable files:

### Brand Header & Logos
- **Logo Graphic / Text**: Located in [components/Logo.tsx](file:///k:/Own/demo/components/Logo.tsx) inside the `{/* EDIT: replace with real logo asset if available */}` comments.

### Hero & Taglines
- **Accreditation Pill Badge**: Located in [components/Hero.tsx](file:///k:/Own/demo/components/Hero.tsx) under `{/* EDIT: accreditation details */}`.
- **Looping Course Names**: Located in [components/Hero.tsx](file:///k:/Own/demo/components/Hero.tsx) under `{/* EDIT: course name */}`.
- **Accreditation Status Banner**: Located in [components/MarqueeStrip.tsx](file:///k:/Own/demo/components/MarqueeStrip.tsx) under `{/* EDIT: marquee text details */}`.

### Institutional Statistics
- **Metric Values & Labels**: Located in [components/Stats.tsx](file:///k:/Own/demo/components/Stats.tsx) under `{/* EDIT: stats */}`. Adjust graduate count, courses count, and durations.

### Course Syllabus Grid
- **Course Descriptions & Pricing**: Located in [components/Courses.tsx](file:///k:/Own/demo/components/Courses.tsx) under `{/* EDIT: course details */}`. You can edit course names (Bengali + English), durations, BDT pricing, and categories.
- **Courses Section Subtitle / Intro**: Located in [components/Courses.tsx](file:///k:/Own/demo/components/Courses.tsx) under `{/* EDIT: description */}`.

### 3D Interactive Keyboard
- **Course Descriptions inside Overlay Modal**: Located in [components/Keyboard3D.tsx](file:///k:/Own/demo/components/Keyboard3D.tsx) under `{/* EDIT: course name */}` inside `handleKeyInteraction`. Customize the floating cards.

### Student Reviews
- **Student Reviews Data**: Located in [components/Testimonials.tsx](file:///k:/Own/demo/components/Testimonials.tsx) under `{/* EDIT: real student testimonials */}`. Change quotes, names, rating stars, and avatar seeds.

### Address & Contact Information
- **Facebook Fanpage Redirect Link**: Located in [components/Contact.tsx](file:///k:/Own/demo/components/Contact.tsx) under `{/* EDIT: Facebook page URL */}`.

### Footer Information
- **Description & Social URLs**: Located in [components/Footer.tsx](file:///k:/Own/demo/components/Footer.tsx).
  - Short description: `{/* EDIT: footer bio */}`
  - Fanpage link: `{/* EDIT: social links */}`
  - Navigation links: `{/* EDIT: nav links */}`
  - Operating codes: `{/* EDIT: legal details */}`

---

## 3. How to Add Classroom Photos

1. Save your classroom photographs or campus graphics inside the `/public/images/` directory (create this directory if it does not exist).
2. Point your standard `<img>` source tag to `/images/photo_name.jpg`. For example, inside [components/Instructors.tsx](file:///k:/Own/demo/components/Instructors.tsx), replace the Dicebear placeholder avatars with:
   ```html
   <img src="/images/instructor_one.jpg" className="w-full h-full object-cover" />
   ```

---

## 4. Setting the Default Theme

By default, **Theme A (Classic Navy & Gold)** loads first.
To change the default theme to **Theme B (Modern Purple & Coral)**:
1. Open [components/ThemeProvider.tsx](file:///k:/Own/demo/components/ThemeProvider.tsx).
2. Change the default React state:
   ```typescript
   // Change from "a" to "b"
   const [theme, setTheme] = useState<Theme>("b");
   ```
3. Update the default document attribute block in `useEffect`:
   ```typescript
   // Change default fallback attribute from "a" to "b"
   document.documentElement.setAttribute("data-theme", "b");
   ```

---

## 5. Updating Contacts (Hotlines, WhatsApp)

- **Phone Helpline**: Search and replace `01643-928687` (e.g., `tel:+8801643928687`) across components.
- **WhatsApp Link**: Update the WhatsApp redirect URL `https://wa.me/8801643928687` in `Hero.tsx`, `Contact.tsx`, and `AdmissionBanner.tsx`.

---

## 6. Cloud Deployments (Free Tier)

### Deploying to Netlify
We have configured a `netlify.toml` file in the root. Netlify will build the static HTML bundle automatically:
1. Connect your repository to your **GitHub** account.
2. Log in to [Netlify](https://www.netlify.com/).
3. Click **Add new site** > **Import an existing project** and select the repository.
4. Netlify will read your [netlify.toml](file:///k:/Own/demo/netlify.toml) automatically:
   *   **Build command**: `npm run build`
   *   **Publish directory**: `out`
5. Click **Deploy site**.

### Deploying to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project** and select your GitHub repository.
3. Vercel automatically detects Next.js. In **Build & Development Settings**, configure:
   *   **Framework Preset**: `Next.js`
   *   **Build Command**: `next build`
   *   **Output Directory**: `out` (Vercel automatically detects static HTML exports).
4. Click **Deploy**.

### Custom Domains Configuration
- Point your domain's DNS settings at your registrar:
  *   **A record** (for root domain): Point to Vercel's IP `76.76.21.21` or Netlify's DNS load balancer.
  *   **CNAME record** (for `www` subdomain): Point to `cname.vercel-dns.com` or your Netlify site URL.
- Enter your domain inside Vercel's **Domains Settings** or Netlify's **Domain Management** dashboard.

---

## 7. Phase 2 Database & API Route Setup

When you are ready to connect a database (MongoDB, PostgreSQL via Prisma, or Supabase) and enable the admissions/student portals:
1. Remove `output: 'export'` from [next.config.js](file:///k:/Own/demo/next.config.js) to enable server-side rendering (SSR) and API routes.
2. Build your backend API endpoints in `/app/api/admissions/route.ts` and `/app/api/contact/route.ts`.
3. In [components/ContactForm.tsx](file:///k:/Own/demo/components/ContactForm.tsx), replace the simulation state loaders with an active `fetch()` request calling your endpoint:
   ```typescript
   const response = await fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formState)
   });
   ```
