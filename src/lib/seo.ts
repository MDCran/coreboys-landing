import { type Member, GROUP, flattenSocials } from "./data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: GROUP.name,
    alternateName: [
      "Create Own Run Everything",
      "TheCoreBoys",
      "the core boys",
      "core boys",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/group/main.jpg`,
    description: SITE_DESCRIPTION,
    foundingDate: GROUP.founded,
    sameAs: Object.values(GROUP.socials),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function personSchema(m: Member) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/${m.slug}#person`,
    name: m.realName,
    alternateName: [m.alias, ...m.keywords.slice(0, 6)],
    url: `${SITE_URL}/${m.slug}`,
    image: `${SITE_URL}${m.photo}`,
    jobTitle: m.role,
    description: m.bio,
    ...(m.bornISO ? { birthDate: m.bornISO } : {}),
    sameAs: flattenSocials(m),
    memberOf: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export const HOME_FAQ = [
  {
    q: "What is CORE?",
    a: "CORE stands for Create Own Run Everything. It is a content-creator collective made up of streamers Marlon (Marlon Garcia), Lacy (Nicholas Fosco), Silky (Jerry Woo), Adapt (Alex Prynkiewicz), Ron — also known as Stable Ronaldo (Rani Netz) — and Jason (JasonTheWeen / Jason Nguyen).",
  },
  {
    q: "Who are the members of CORE / TheCoreBoys?",
    a: "The six CORE members are Marlon, Lacy, Silky, Adapt, Ron (Stable Ronaldo) and Jason (JasonTheWeen). Each member streams on Twitch and creates content on YouTube, TikTok, Instagram and X.",
  },
  {
    q: "Why is the CORE / TheCoreBoys site under maintenance?",
    a: "The flagship CORE website is being rebuilt. This temporary lander keeps a single source of truth for the group and member channels so fans can still find every official link in one place.",
  },
  {
    q: "Where can I follow CORE on social media?",
    a: "CORE is on YouTube at @createownruneverything, TikTok at @officialcoreboys, X at @thecoreboys and Instagram at @createownruneverything. Every member also has their own page on this site linking out to their personal channels.",
  },
  {
    q: "What does Create Own Run Everything mean?",
    a: "Create Own Run Everything (CORE) is the operating principle of the group: the creators on screen also create the content, own the IP, and run the business behind it.",
  },
];
