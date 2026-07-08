import { getGoogleReviews } from "@/actions/reviews.action";
import ReviewsSection from "../about/_components/reviews";

// Server wrapper: fetches 5-star Google reviews, feeds the client slider.
const GoogleReviews = async () => {
  const { reviews } = await getGoogleReviews();
  console.log(reviews, "reviews");
  
  return <ReviewsSection reviews={reviews} />;
};

export default GoogleReviews;
