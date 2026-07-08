"use server";

/**
 * Fetch Google Places reviews and return ONLY 5-star ones.
 * Note: the Places Details API returns at most 5 reviews, so the
 * filtered list can be shorter than 5.
 */
export async function getGoogleReviews() {
  const placeId = process.env.GOOGLE_PLACEID;
  const apiKey = process.env.GOOLE_API_KEY; // (env has this spelling)

  if (!placeId || !apiKey) {
    console.error("Missing GOOGLE_PLACEID or GOOLE_API_KEY");
    return { success: false, reviews: [] };
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=reviews,rating,user_ratings_total` +
    `&reviews_no_translations=true` +
    `&key=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // 1h cache
    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Places API error:", data.status, data.error_message);
      return { success: false, reviews: [] };
    }

    const reviews = (data.result?.reviews || [])
      .filter((r) => r.rating === 5)
      .map((r, i) => ({
        id: r.time || i,
        rating: r.rating,
        body: r.text,
        name: r.author_name,
        when: r.relative_time_description,
        photo: r.profile_photo_url,
      }));

    return { success: true, reviews };
  } catch (err) {
    console.error("getGoogleReviews failed:", err);
    return { success: false, reviews: [] };
  }
}
