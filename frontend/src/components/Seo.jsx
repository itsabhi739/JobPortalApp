import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, SITE_NAME, SITE_URL } from "../seoConfig";

// Create or update a single <meta>/<link> tag in <head>. Updating the existing
// static tags from index.html (instead of adding new ones) avoids duplicates and
// keeps sensible fallbacks for crawlers that do not execute JavaScript.
const upsertTag = (tagName, matchAttr, matchValue, attrs) => {
  let el = document.head.querySelector(`${tagName}[${matchAttr}="${matchValue}"]`);
  if (!el) {
    el = document.createElement(tagName);
    el.setAttribute(matchAttr, matchValue);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
};

const clip = (text = "", max = 160) => {
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
};

/**
 * Per-page SEO: title, description, canonical, robots, Open Graph, Twitter card
 * and optional JSON-LD structured data.
 */
const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}) => {
  const location = useLocation();
  const canonicalPath = path ?? location.pathname;
  const url = `${SITE_URL}${canonicalPath === "/" ? "/" : canonicalPath.replace(/\/$/, "")}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Find Jobs, Internships & Hire Top Talent`;
  const desc = clip(description);
  const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";

  useEffect(() => {
    document.title = fullTitle;
    upsertTag("meta", "name", "description", { content: desc });
    upsertTag("meta", "name", "robots", { content: robots });
    upsertTag("link", "rel", "canonical", { href: url });

    upsertTag("meta", "property", "og:title", { content: fullTitle });
    upsertTag("meta", "property", "og:description", { content: desc });
    upsertTag("meta", "property", "og:url", { content: url });
    upsertTag("meta", "property", "og:type", { content: type });
    upsertTag("meta", "property", "og:image", { content: image });

    upsertTag("meta", "name", "twitter:title", { content: fullTitle });
    upsertTag("meta", "name", "twitter:description", { content: desc });
    upsertTag("meta", "name", "twitter:image", { content: image });
  }, [fullTitle, desc, robots, url, type, image]);

  if (!jsonLd) return null;
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; escape "<" so data can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
};

export default Seo;
