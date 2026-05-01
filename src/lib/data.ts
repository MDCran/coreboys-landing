export type SocialKey =
  | "youtube"
  | "tiktok"
  | "instagram"
  | "twitch"
  | "x"
  | "snapchat";

export type Member = {
  slug: string;
  alias: string;
  realName: string;
  born?: string;
  bornISO?: string;
  index: string;
  photo: string;
  role: string;
  headline: string;
  bio: string;
  keywords: string[];
  wikipedia?: string;
  /** Community/brand color used for hover states */
  color: string;
  /** Member's stream community (e.g. Thugs, SLG, Flock) */
  community?: { name: string; logo: string };
  /** Auto-scrolling gallery image count (files served from /gallery/[slug]/N.jpg) */
  galleryCount?: number;
  /** Optional override for the small avatar shown in the navbar dropdown */
  twitchAvatar?: string;
  socials: Partial<Record<SocialKey, string[]>>;
};

export const MEMBER_COLOR: Record<string, string> = {
  marlon: "#b8b3aa",
  lacy: "#ff3b1f",
  silky: "#f4c443",
  adapt: "#ff3b1f",
  ron: "#3b9dff",
  jason: "#ffd84a",
};

export const GROUP = {
  name: "CORE",
  expansion: "Create Own Run Everything",
  founded: "2024",
  socials: {
    youtube: "https://www.youtube.com/@createownruneverything",
    tiktok: "https://www.tiktok.com/@officialcoreboys",
    x: "https://x.com/thecoreboys",
    instagram: "https://www.instagram.com/createownruneverything",
  },
};

const RAW_MEMBERS: Member[] = [
  {
    slug: "marlon",
    alias: "Marlon",
    realName: "Marlon Garcia",
    born: "September 7, 2001",
    bornISO: "2001-09-07",
    index: "05",
    photo: "/members/marlon.v2.jpg",
    color: MEMBER_COLOR.marlon,
    community: { name: "M3", logo: "/communities/marlon.png" },
    galleryCount: 7,
    twitchAvatar: "/members/marlon-twitch.jpg",
    role: "Streamer · Creator · CORE Member",
    headline:
      "Marlon (Marlon Garcia) — Twitch streamer and CORE member known on YouTube as Mar3lg.",
    bio: "Marlon Garcia, known online as Marlon (handle Mar3lg), is a Twitch streamer and YouTube creator and one of the six members of the CORE (Create Own Run Everything) content collective. He streams on twitch.tv/marlon and runs multiple YouTube channels including @Mar3lg, @OtherSideOfMarlon and @MarlonVODs.",
    keywords: [
      "Marlon",
      "Marlon Garcia",
      "Mar3lg",
      "marlon3lg",
      "marlon streamer",
      "marlon twitch",
      "marlon youtube",
      "marlon CORE",
    ],
    wikipedia: "https://en.wikipedia.org/wiki/Marlon_(streamer)",
    socials: {
      youtube: [
        "https://www.youtube.com/@Mar3lg",
        "https://www.youtube.com/@OtherSideOfMarlon",
        "https://www.youtube.com/@MarlonVODs",
      ],
      tiktok: ["https://www.tiktok.com/@marlon3lg"],
      instagram: ["https://www.instagram.com/marlon3lg"],
      twitch: ["https://www.twitch.tv/marlon"],
      x: ["https://x.com/Mar3lg"],
      snapchat: ["https://www.snapchat.com/@marlonluga"],
    },
  },
  {
    slug: "lacy",
    alias: "Lacy",
    realName: "Nicholas Fosco",
    index: "04",
    photo: "/members/lacy.jpg",
    color: MEMBER_COLOR.lacy,
    community: { name: "Thugs", logo: "/communities/lacy.png" },
    galleryCount: 10,
    role: "Streamer · Creator · CORE Member",
    headline:
      "Lacy (Nicholas Fosco) — Twitch streamer, IRL creator and CORE member also known as LacyHimself.",
    bio: "Nicholas Fosco, known online as Lacy (or LacyHimself), is a Twitch streamer and YouTube creator and a founding member of the CORE (Create Own Run Everything) house. He streams on twitch.tv/lacy and runs the @lacyhimself, @LacyIRLs and @lacylive YouTube channels.",
    keywords: [
      "Lacy",
      "LacyHimself",
      "Lacy.himself",
      "Nicholas Fosco",
      "Lacy streamer",
      "Lacy twitch",
      "Lacy CORE",
      "LacyLive",
    ],
    wikipedia: "https://youtube.fandom.com/wiki/Lacy_Live",
    socials: {
      youtube: [
        "https://www.youtube.com/@lacyhimself",
        "https://www.youtube.com/@LacyIRLs",
        "https://www.youtube.com/@lacylive",
      ],
      tiktok: ["https://www.tiktok.com/@lacy"],
      instagram: ["https://www.instagram.com/lacy.himself/"],
      twitch: ["https://www.twitch.tv/lacy/"],
      x: ["https://x.com/LacyHimself"],
      snapchat: ["https://www.snapchat.com/@lacy.himself"],
    },
  },
  {
    slug: "silky",
    alias: "Silky",
    realName: "Jerry Woo",
    born: "October 21, 1997",
    bornISO: "1997-10-21",
    index: "06",
    photo: "/members/silky.v3.jpg",
    color: MEMBER_COLOR.silky,
    community: { name: "SLG", logo: "/communities/silky.png" },
    galleryCount: 11,
    twitchAvatar: "/members/silky-twitch.jpg",
    role: "Streamer · Creator · CORE Member",
    headline:
      "Silky (Jerry Woo) — Twitch streamer and CORE member also known as YungSilk and SilkyLive.",
    bio: "Jerry Woo, known online as Silky (handles yungsilk and SilkyLive), is a Twitch streamer and YouTube creator and a member of the CORE (Create Own Run Everything) collective. He streams at twitch.tv/silky and runs the @Silky2 and @SilkyLive YouTube channels.",
    keywords: [
      "Silky",
      "Jerry Woo",
      "yungsilk",
      "SilkyLive",
      "SilkySzn",
      "Silky streamer",
      "Silky twitch",
      "Silky CORE",
    ],
    wikipedia: "https://streamers.fandom.com/wiki/Silky",
    socials: {
      youtube: [
        "https://www.youtube.com/@Silky2",
        "https://www.youtube.com/@SilkyLive",
      ],
      tiktok: ["https://www.tiktok.com/@yungsilk"],
      instagram: ["https://www.instagram.com/silky.durag/"],
      twitch: ["https://www.twitch.tv/silky"],
      x: ["https://x.com/SilkySzn"],
    },
  },
  {
    slug: "adapt",
    alias: "Adapt",
    realName: "Alexander Hamilton Prynkiewicz",
    index: "01",
    photo: "/members/adapt.jpg",
    color: MEMBER_COLOR.adapt,
    community: { name: "Flock", logo: "/communities/adapt.png" },
    galleryCount: 8,
    role: "Streamer · Creator · CORE Member",
    headline:
      "Adapt (Alex Prynkiewicz) — FaZe Adapt, longtime YouTuber, Twitch streamer and CORE member.",
    bio: "Alexander Hamilton Prynkiewicz, known online as Adapt (FaZe Adapt), is a YouTuber, Twitch streamer and content creator and a member of the CORE (Create Own Run Everything) collective. He runs the @adapt and @FaZeAdaptLive YouTube channels and streams at twitch.tv/adapt.",
    keywords: [
      "Adapt",
      "FaZe Adapt",
      "Alex Prynkiewicz",
      "Alexander Prynkiewicz",
      "thefazeadapt",
      "Adapt streamer",
      "Adapt YouTuber",
      "Adapt CORE",
    ],
    wikipedia: "https://youtube.fandom.com/wiki/FaZe_Adapt",
    socials: {
      youtube: [
        "https://www.youtube.com/@adapt",
        "https://www.youtube.com/@FaZeAdaptLive",
      ],
      tiktok: ["https://www.tiktok.com/@fazeadapt"],
      instagram: ["https://www.instagram.com/thefazeadapt"],
      twitch: ["https://www.twitch.tv/adapt"],
      x: ["https://x.com/FaZeAdapt"],
      snapchat: ["https://www.snapchat.com/@adaptsnaps"],
    },
  },
  {
    slug: "ron",
    alias: "Ron",
    realName: "Rani Netz",
    born: "January 15, 2003",
    bornISO: "2003-01-15",
    index: "03",
    photo: "/members/ron.jpg",
    color: MEMBER_COLOR.ron,
    community: { name: "Stable", logo: "/communities/ron.png" },
    galleryCount: 19,
    role: "Streamer · Creator · CORE Member",
    headline:
      "Ron (Stable Ronaldo / Rani Netz) — Twitch streamer, esports figure and CORE member.",
    bio: "Rani Netz, known online as Stable Ronaldo (or Ron), is a Twitch streamer, content creator and former competitive Fortnite player and a member of the CORE (Create Own Run Everything) house. He streams on twitch.tv/stableronaldo and runs the StableRonaldoYT, @StableRonaldoLive and @TheStableYT channels.",
    keywords: [
      "Ron",
      "Stable Ronaldo",
      "StableRonaldo",
      "Rani Netz",
      "stableronaldo twitch",
      "stableronaldo youtube",
      "Ron CORE",
      "Stable Ronaldo CORE",
    ],
    wikipedia: "https://en.wikipedia.org/wiki/Stable_Ronaldo",
    socials: {
      youtube: [
        "https://www.youtube.com/channel/stableronaldoyt",
        "https://www.youtube.com/@StableRonaldoLive",
        "https://www.youtube.com/@TheStableYT",
      ],
      tiktok: ["https://www.tiktok.com/@realstableronaldo"],
      instagram: ["https://www.instagram.com/stableronaldo/"],
      twitch: ["https://www.twitch.tv/stableronaldo"],
      x: ["https://x.com/StableRonaldo"],
      snapchat: ["https://www.snapchat.com/@stableronaldoo"],
    },
  },
  {
    slug: "jason",
    alias: "Jason",
    realName: "Jason Nguyen",
    born: "May 9, 2004",
    bornISO: "2004-05-09",
    index: "02",
    photo: "/members/jason.jpg",
    color: MEMBER_COLOR.jason,
    community: { name: "NMS", logo: "/communities/jason.png" },
    galleryCount: 15,
    role: "Streamer · Creator · CORE Member",
    headline:
      "Jason (JasonTheWeen / Jason Nguyen) — Twitch streamer, IRL creator and CORE member.",
    bio: "Jason Nguyen, known online as JasonTheWeen (or Jason), is a Twitch streamer and YouTube creator and a member of the CORE (Create Own Run Everything) collective. He streams on twitch.tv/jasontheween and runs multiple YouTube channels including @jasontheweenie, @JasonTheWeenIRL, @JasonTheWeenCIips and @JasonTheWeenVOD.",
    keywords: [
      "Jason",
      "JasonTheWeen",
      "Jason the ween",
      "Jason Nguyen",
      "jasontheween twitch",
      "jasontheween youtube",
      "Jason CORE",
    ],
    wikipedia: "https://twitch-streamers.fandom.com/wiki/Jason_the_ween",
    socials: {
      youtube: [
        "https://www.youtube.com/c/jasontheweenie",
        "https://www.youtube.com/@JasonTheWeenIRL",
        "https://www.youtube.com/@JasonTheWeenCIips",
        "https://www.youtube.com/@JasonTheWeenVOD",
      ],
      tiktok: ["https://www.tiktok.com/@jasontheween"],
      instagram: ["https://www.instagram.com/jasontheween/"],
      twitch: ["https://www.twitch.tv/jasontheween"],
      x: ["https://x.com/jasontheween"],
      snapchat: ["https://www.snapchat.com/@jasontheweens"],
    },
  },
];

export const MEMBERS: Member[] = [...RAW_MEMBERS].sort((a, b) =>
  a.index.localeCompare(b.index)
);

export const SOCIAL_LABEL: Record<SocialKey, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  twitch: "Twitch",
  x: "X",
  snapchat: "Snapchat",
};

export function getMember(slug: string): Member | undefined {
  return MEMBERS.find((m) => m.slug === slug);
}

export function flattenSocials(m: Member): string[] {
  const all: string[] = [];
  for (const k of Object.keys(m.socials) as SocialKey[]) {
    const arr = m.socials[k];
    if (arr) all.push(...arr);
  }
  return all;
}
