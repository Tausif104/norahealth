import { prisma } from "@/lib/client/prisma";

const siteUrl = (process.env.APP_URL || "https://norahealth.co.uk").replace(
  /\/$/,
  ""
);

const excludedPrefixes = [
  "/account",
  "/admin",
  "/author",
  "/login",
  "/register",
  "/profile",
];

const staticRoutes = [
  "/",
  "/about",
  "/articles",
  "/booking",
  "/booking/confirm",
  "/booking/order",
  "/contact",
  "/contraception-choices/begin",
  "/contraception-choices/outcomes",
  "/contraception-choices/outcomes/combined",
  "/contraception-choices/outcomes/condoms",
  "/contraception-choices/outcomes/copper-iud",
  "/contraception-choices/outcomes/implants",
  "/contraception-choices/outcomes/injection",
  "/contraception-choices/outcomes/progesterone-only",
  "/contraception-choices/outcomes/rings",
  "/contraception-choices/step-1",
  "/contraception-choices/step-2",
  "/contraception-choices/step-3",
  "/contraception-choices/step-4",
  "/contraception-choices/step-5",
  "/legal-policies",
];

function isAllowedRoute(route) {
  return !excludedPrefixes.some(
    (prefix) => route === prefix || route.startsWith(`${prefix}/`)
  );
}

function toSitemapEntry(route, options = {}) {
  return {
    url: `${siteUrl}${route}`,
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency || "weekly",
    priority: options.priority ?? (route === "/" ? 1 : 0.7),
  };
}

export default async function sitemap() {
  const posts = await prisma.post.findMany({
    where: { isActive: true },
    select: {
      postSlug: true,
      updatedAt: true,
    },
  });

  const postRoutes = posts.flatMap((post) => [
    toSitemapEntry(`/articles/${post.postSlug}`, {
      lastModified: post.updatedAt,
      priority: 0.8,
    }),
  ]);

  return [
    ...staticRoutes.filter(isAllowedRoute).map((route) => toSitemapEntry(route)),
    ...postRoutes,
  ];
}
