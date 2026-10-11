# Andreya Mouratek — Portfolio

React 18 + Vite 5 + Tailwind CSS v4 (`@tailwindcss/vite`) + Framer Motion + React Router + React Hook Form + React Helmet Async + EmailJS + Lucide.

## Run
```
npm install
npm run dev        # development
npm run build      # production build -> dist
npm run preview
```

## Structure
`src/data/` holds all editable content (profile/contact, articles, projects). `src/pages/` has one file per route; `src/components/` has Layout, ContactForm and shared UI/animation variants.

## Environment variables (see `.env.example`)
`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (public keys only, never secrets), and optional `VITE_SITE_URL`.

## Contact form
Create an EmailJS service and template (template variables: `name`, `email`, `subject`, `category`, `message`, `reply_to`), then set the three variables locally in `.env` and in Vercel. **If they are not set**, the form opens the visitor's email app with the message prefilled addressed to the owner and says so; it never shows a fake "sent" message.

## Deploy (Vercel)
Import the repo; build command `npm run build`, output `dist`. `vercel.json` rewrites all routes to `index.html` so direct visits to `/about`, `/stories/...` work. Add the env vars in project settings.

## Adding content
- **Articles:** add an object to `src/data/articles.js` (`section: 'stories'` or `'ideas'`). Remove the demonstration entry when real ones exist.
- **Projects:** add to `projects` in `src/data/projects.js`; `category` must match one of the four category names.
- **Images:** place files in `public/images/{profile,logistics,science,writing,projects}/` and reference as `/images/...`. The site currently uses no stock photos.
- **Sitemap/canonical:** add once the production domain is known.
