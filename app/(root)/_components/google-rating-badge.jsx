/* "Google" wordmark in its brand colours (transparent, crisp — no image box) */
const LETTERS = [
  { ch: "G", c: "#4285F4" },
  { ch: "o", c: "#EA4335" },
  { ch: "o", c: "#FBBC05" },
  { ch: "g", c: "#4285F4" },
  { ch: "l", c: "#34A853" },
  { ch: "e", c: "#EA4335" },
];

// Nora Health Google Business Profile (opens the listing + reviews).
const GOOGLE_PROFILE_URL = "https://www.google.com/maps?cid=4341612241905128635";

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-[17px]">
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.401 8.168L12 18.897l-7.335 3.863 1.401-8.168L.132 9.21l8.2-1.192z" />
  </svg>
);

/**
 * Google reviews trust badge — real Google colours rendered as text/SVG so it
 * is fully transparent and crisp at any size. Links out to the Nora Health
 * Google Business Profile.
 */
const GoogleRatingBadge = () => (
  <a
    href={GOOGLE_PROFILE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="See Nora Health on Google"
    className="inline-flex flex-col items-center justify-center gap-1 transition duration-300 hover:opacity-80 cursor-pointer"
  >
    <span className="font-sans text-[22px] font-bold leading-none tracking-[-0.5px]">
      {LETTERS.map((l, i) => (
        <span key={i} style={{ color: l.c }}>
          {l.ch}
        </span>
      ))}
    </span>
    <span className="flex items-center gap-[2px] text-[#FBBC05]">
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </span>
  </a>
);

export default GoogleRatingBadge;
