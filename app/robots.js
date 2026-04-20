const siteUrl = (process.env.APP_URL || "https://norahealth.co.uk").replace(
  /\/$/,
  ""
);

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/account/",
        "/admin",
        "/admin/",
        "/author",
        "/author/",
        "/login",
        "/register",
        "/profile",
        "/profile/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
