import Image from "next/image";
import Link from "next/link";

/**
 * Google reviews trust badge (tightly-cropped transparent logo), linking to
 * the Nora Health Google listing.
 */
const GoogleRatingBadge = () => (
  <Link
    href="https://www.google.com/maps?cid=4341612241905128635"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="See Nora Health reviews on Google"
    className="inline-flex items-center transition duration-300 hover:opacity-80"
  >
    <Image
      src="/images/google-reviews.png"
      width={360}
      height={150}
      alt="Google Reviews — 5 stars"
      className="h-12 w-auto"
      priority
    />
  </Link>
);

export default GoogleRatingBadge;
