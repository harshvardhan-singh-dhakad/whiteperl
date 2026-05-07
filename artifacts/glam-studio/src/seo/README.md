# SEO Implementation Guide - Glam Studio

This guide explains how to manage and verify SEO for the Glam Studio website.

## 1. Updating Metadata
- **Global Settings**: Update `src/seo/meta.ts` -> `defaultMeta`.
- **Page Specific**: Use the `generateMeta(page)` function in your components to override tags for specific pages (Home, About, Services, etc.).
- **New Pages**: Add the page name to the `PageName` type and the `overrides` object in `meta.ts`.

## 2. Sitemap Management
- The sitemap is located at `public/sitemap.xml`.
- **New Pages**: Every time you add a new service or blog post, add a new `<url>` entry to `sitemap.xml`.
- **Date Update**: Update the `<lastmod>` tag whenever you make significant changes to a page.

## 3. Schema Markup
- **LocalBusiness**: Edit `src/seo/schema.ts` to update business hours, address, or social links.
- **Breadcrumbs**: Use `generateBreadcrumbsSchema` from `src/seo/breadcrumbs.ts` on individual pages to help Google understand your site structure.

## 4. Verification & Tools
- **Google Search Console**: 
  1. Login to Search Console.
  2. Add your property `https://glamstudio.in`.
  3. Upload the `sitemap.xml` URL.
- **Rich Results Test**: Use Google's [Rich Results Test](https://search.google.com/test/rich-results) to verify your Schema JSON-LD.
- **Mobile Friendly**: Ensure your Three.js backgrounds don't hinder performance (Mobile-first indexing).

## 5. Deployment
The `.htaccess` file in `public/` will automatically handle:
- HTTPS Enforcement
- WWW to Non-WWW redirection
- SPA routing for the React app
