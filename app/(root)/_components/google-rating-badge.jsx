import Link from "next/link";

/* Brand-coloured 5-point star (SVG, crisp at any size) */
const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.401 8.168L12 18.897l-7.335 3.863 1.401-8.168L.132 9.21l8.2-1.192z" />
  </svg>
);

/**
 * Google reviews trust badge in Nora Health brand colours (no multicolour
 * Google logo). Links to the Nora Health Google listing.
 */
const GoogleRatingBadge = () => (
  <Link
    href="https://www.google.com/maps?cid=4341612241905128635"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="See Nora Health reviews on Google"
    className="group inline-flex flex-col items-center justify-center gap-1 rounded-[14px] border border-[#CE8936]/40 bg-transparent px-5 py-2.5 transition duration-300 hover:border-[#CE8936]"
  >
    <span className="text-[13px] font-semibold leading-none tracking-[-0.2px] text-[#491F40]">
      Google Reviews
    </span>
    <span className="flex items-center gap-[3px] text-[#CE8936]">
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </span>
  </Link>
);

export default GoogleRatingBadge;
