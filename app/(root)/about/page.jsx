import PageBanner from "@/components/global/page-banner";
import AboutAlt from "./_components/about-alt";
import Mission from "./_components/mission";
import TeamSection from "./_components/team";
import VideoSection from "../_components/video";
import StatisticsBoxes from "./_components/statistics";
import GoogleReviews from "../_components/google-reviews";
export const metadata = {
  title: "About Us",
  description: "Free Oral Contraception, Delivered to Your Door",
};

const AboutPage = () => {
  return (
    <>
      <PageBanner title='About Us' />
      {/* <AboutAlt /> */}
      <Mission />
      <TeamSection />
      <VideoSection />
      <StatisticsBoxes />
      <GoogleReviews />
    </>
  );
};

export default AboutPage;
