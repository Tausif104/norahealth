import Hero from "./_components/hero";
import AboutSection from "./_components/about";
import HowItWorks from "./_components/how-it-works";
import VideoSection from "./_components/video";
import WhyChooseNora from "./_components/why-choose";
import ChoicesSection from "./_components/choices";
import Benifits from "./_components/benifits";
import Stories from "./_components/stories";
import Faq from "./_components/faq";
import GoogleReviews from "./_components/google-reviews";
import VideoSectionHome from "./_components/videoHome";

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <AboutSection /> */}
      <HowItWorks />
      <VideoSectionHome />
      <WhyChooseNora />
      <ChoicesSection />
      <Benifits />
      {/* <Stories /> */}
      <GoogleReviews />

      <Faq />
    </>
  );
};

export default HomePage;
