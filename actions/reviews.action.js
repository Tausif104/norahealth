"use server";

/**
 * Fetch Google reviews via the Places API (New) and return ONLY 5-star ones.
 *
 * We use the Places API (New) — GET https://places.googleapis.com/v1/places/{placeId}
 * — because the legacy Place Details API does not serve this business
 * (a service-area profile). Note: Google still returns at most 5 reviews,
 * so the filtered list can be shorter than 5.
 */
export async function getGoogleReviews() {
  const placeId = process.env.GOOGLE_PLACEID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!placeId || !apiKey) {
    console.error("Missing GOOGLE_PLACEID or GOOGLE_API_KEY");
    return { success: false, reviews: [] };
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
    placeId,
  )}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        // Only ask for what we render.
        "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,reviews",
      },
      next: { revalidate: 3600 }, // 1h cache
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error(
        "Places API (New) error:",
        data?.error?.status,
        data?.error?.message,
      );
      return { success: false, reviews: [] };
    }

    const reviews = (data.reviews || [])
      .filter((r) => r.rating === 5)
      .map((r, i) => ({
        id: r.name || r.publishTime || i,
        rating: r.rating,
        body: r.text?.text || r.originalText?.text || "",
        name: r.authorAttribution?.displayName || "Anonymous",
        when: r.relativePublishTimeDescription || "",
        photo: r.authorAttribution?.photoUri || null,
      }));

    return { success: true, reviews };
  } catch (err) {
    console.error("getGoogleReviews failed:", err);
    return { success: false, reviews: [] };
  }
}
