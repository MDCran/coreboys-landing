import type { SocialKey } from "@/lib/data";

type Props = {
  kind: SocialKey;
  className?: string;
};

export default function SocialIcon({ kind, className }: Props) {
  const c = className ?? "size-4";
  switch (kind) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden>
          <path
            fill="currentColor"
            d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden>
          <path
            fill="currentColor"
            d="M19.5 8.4a7.4 7.4 0 0 1-4.3-1.4v8.4a6.3 6.3 0 1 1-6.3-6.3c.3 0 .7 0 1 .1v3.2a3.1 3.1 0 1 0 2.2 3V2h3a4.3 4.3 0 0 0 4.3 4.2v2.2Z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "twitch":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden>
          <path
            fill="currentColor"
            d="M4.3 2 3 5.3v14.4h4.7V22h2.7l2.3-2.3h3.7L21 15V2H4.3Zm15.4 12L17 16.7h-4.7l-2.3 2.3v-2.3H6.3V3.7h13.4V14ZM15 6.7h1.7v5H15v-5Zm-4.3 0h1.6v5h-1.6v-5Z"
          />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden>
          <path
            fill="currentColor"
            d="M18.244 2H21.5l-7.5 8.57L23 22h-6.812l-5.34-6.984L4.7 22H1.44l8.06-9.207L1 2h6.98l4.83 6.39L18.244 2Zm-1.193 18h1.844L7.05 4H5.072l11.979 16Z"
          />
        </svg>
      );
    case "snapchat":
      return (
        <svg viewBox="0 0 24 24" className={c} aria-hidden>
          <path
            fill="currentColor"
            d="M12 2.2c2.9 0 5.4 1.8 6.2 4.6.2.6.2 1.6.1 3.4l-.1 1.4.7.5c.3.2.7.4 1.1.4.5.1.7.3.7.6 0 .5-.7 1-1.9 1.5-.4.1-.5.3-.4.7.1.3.2.5.4.8.5.8 1.5 1.4 2.7 1.6.4 0 .5.2.4.5-.1.5-1.2 1-2.7 1.2-.3 0-.4.2-.5.5-.2.7-.4 1-.7 1.1-.4 0-.9-.1-1.5-.3-.9-.3-1.7-.4-2.4-.1-.4.1-.7.4-1.2.7-.7.6-1.3.9-2.1.9-.7 0-1.3-.3-2-.9-.5-.4-.8-.6-1.2-.7-.6-.2-1.4-.1-2.4.1-.6.2-1.1.3-1.5.3-.3-.1-.5-.4-.7-1.1-.1-.3-.2-.4-.5-.5-1.5-.2-2.6-.7-2.7-1.2-.1-.3 0-.5.4-.5 1.2-.2 2.2-.8 2.7-1.6.2-.3.3-.5.4-.8.1-.4 0-.6-.4-.7-1.2-.5-1.9-1-1.9-1.5 0-.3.2-.5.7-.6.4 0 .8-.2 1.1-.4l.7-.5-.1-1.4c-.1-1.8-.1-2.8.1-3.4C6.6 4 9.1 2.2 12 2.2Z"
          />
        </svg>
      );
  }
}
