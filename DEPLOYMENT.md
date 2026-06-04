# Deployment & Customization Guide

This file provides comprehensive instructions on how to run, customize, and deploy the **Dristy Computer Training Institute** website.

---

## 1. Running Locally

To install dependencies and start the development server locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Open Local Host**:
   Navigate to `http://localhost:3000` in your web browser.

---

## 2. Customizing Placeholder Content

All text, statistics, courses, and bios are structured as editable JavaScript/TypeScript models and are clearly demarcated with `{/* EDIT: ... */}` comments. Here is a list of all customizable files:

### Brand Header & Logo
- **Logo Text**: Located in [components/Logo.tsx](file:///k:/Own/demo/components/Logo.tsx) inside the `{/* EDIT: institute name */}` comments.

### Hero & Taglines
- **Accreditation Badge**: Located in [components/Hero.tsx](file:///k:/Own/demo/components/Hero.tsx) under `{/* EDIT: Govt Approved Training Badge */}`.
- **Institute Main Heading**: Located in [components/Hero.tsx](file:///k:/Own/demo/components/Hero.tsx) under `{/* EDIT: institute name */}`.
- **Hero Description / Tagline**: Located in [components/Hero.tsx](file:///k:/Own/demo/components/Hero.tsx) under `{/* EDIT: tagline */}`.

### Institute Statistics
- **Numbers & Metrics**: Located in [components/Stats.tsx](file:///k:/Own/demo/components/Stats.tsx) under `{/* EDIT: stats */}`. You can customize graduates count, courses count, establishment year, and BTEB board indicators.

### Course Syllabus Grid
- **Course Descriptions & Pricing**: Located in [components/Courses.tsx](file:///k:/Own/demo/components/Courses.tsx) under `{/* EDIT: course details */}`. You can edit course names, durations, prices in BDT, and descriptions.

### Feature Scrolling Panels
- **Stages 1 - 4 Texts**: Located in [components/ScrollLinkedFeature.tsx](file:///k:/Own/demo/components/ScrollLinkedFeature.tsx) under the corresponding Stage comments (e.g. `{/* EDIT: Stage 1 text */}`). Update headers and descriptions mapping to the rotating 3D laptop stages.

### Instructors List
- **Trainer Bio & Social links**: Located in [components/Instructors.tsx](file:///k:/Own/demo/components/Instructors.tsx) under `{/* EDIT: instructor details */}`. Adjust names, designations, custom text bio descriptions, skill tags, and social profiles.

### Student Reviews
- **Testimonial Quotes**: Located in [components/Testimonials.tsx](file:///k:/Own/demo/components/Testimonials.tsx) under `{/* EDIT: testimonials */}`. Customize review copy, names, rating stars, and avatar seeds.

### Address & Contact Information
- **Phone, Email, Maps Location**: Located in [components/Contact.tsx](file:///k:/Own/demo/components/Contact.tsx) under the `{/* EDIT: contact info */}` comments. Customize the HQ address, support hotlines, contact email, and technical board code.

### Footer Information
- **Bio, Legal, Social URLs**: Located in [components/Footer.tsx](file:///k:/Own/demo/components/Footer.tsx).
  - Footer description bio: `{/* EDIT: footer bio */}`
  - Social media URLs: `{/* EDIT: social links */}`
  - Bottom navigation shortcuts: `{/* EDIT: nav links */}`
  - Operational details: `{/* EDIT: legal details */}`

---

## 3. Replacing Favicon and Logo Graphics

- **Favicon**:
  - Replace the vector icon at `public/favicon.svg` with your custom SVG logo/icon. The site will automatically load it.
- **Logo Graphic**:
  - Currently, a premium text logo is active. To swap this for a picture logo, edit [components/Logo.tsx](file:///k:/Own/demo/components/Logo.tsx) and replace the text element with a standard HTML `<img>` tag or Next.js `<Image />` pointing to your logo asset in the `public/` directory.

---

## 4. Deploying to Netlify (Free Tier)

### Option A: Connected Git Repository (Recommended)
1. Push your code repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [Netlify](https://www.netlify.com/) and sign up / log in to your account.
3. Click **Add new site** > **Import an existing project**.
4. Authorize your git provider and select your repository.
5. In **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (or leave default, Netlify detects Next.js configurations automatically and provisions serverless Netlify Functions).
6. Click **Deploy site**.

### Option B: Netlify CLI/Drag-and-Drop
1. Build your project locally using `npm run build`.
2. Drag and drop the compiled output folder into the Netlify drag-and-drop dashboard portal.

---

## 5. Deploying to Vercel (Free Tier)

1. Push your codebase to **GitHub**.
2. Navigate to [Vercel](https://vercel.com) and log in.
3. Click **Add New** > **Project**.
4. Import your website repository.
5. Vercel automatically configures the project settings for Next.js:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
6. Click **Deploy**. Vercel will build the 3D application and provide an active production domain (e.g. `dristy-institute.vercel.app`).

---

## 6. Configuring Custom Domains

### On Netlify:
1. In your site dashboard, go to **Site configuration** > **Domain management** > **Domains**.
2. Click **Add domain alias** and input your custom domain (e.g. `dristyinstitute.com`).
3. Netlify will prompt you to configure DNS records. Point your domain's **CNAME** or **ANAME** records to Netlify's DNS servers as shown.

### On Vercel:
1. Go to your Vercel project **Settings** > **Domains**.
2. Add your custom domain (e.g. `dristyinstitute.com`).
3. Set up the custom DNS records at your domain registrar:
   - For root domain (A record): Point to `76.76.21.21`.
   - For subdomain CNAME (e.g. `www`): Point to `cname.vercel-dns.com`.

---

## 7. Environment Variables

This application does **not** require any backend API database keys or third-party client environment tokens to build. 

If you integrate dynamic email services (e.g. EmailJS, SendGrid) inside the contact form later, specify your tokens in a local `.env.local` file and add them under settings on your Netlify or Vercel dashboard.
