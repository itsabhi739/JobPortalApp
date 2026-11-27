// Set VITE_SITE_URL in Vercel if the production domain changes.
export const SITE_NAME = "AbhiJob";
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://abhijob-portal-app-olive.vercel.app").replace(/\/$/, "");
export const DEFAULT_DESCRIPTION =
  "AbhiJob is a placement management system that helps students and freshers find jobs and internships, and helps recruiters and companies hire top talent.";
export const DEFAULT_IMAGE = `${SITE_URL}/web-app-manifest-512x512.png`;
