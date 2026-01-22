import Hero from "./_components/hero";
import AboutSection from "./_components/about";
import HowItWorks from "./_components/how-it-works";
import VideoSection from "./_components/video";
import WhyChooseNora from "./_components/why-choose";
import ChoicesSection from "./_components/choices";
import Benifits from "./_components/benifits";
import Stories from "./_components/stories";
import Faq from "./_components/faq";
import ReviewsSection from "./about/_components/reviews";

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <AboutSection /> */}
      <HowItWorks />
      <VideoSection />
      <WhyChooseNora />
      <ChoicesSection />
      <Benifits />
      {/* <Stories /> */}
      <ReviewsSection />
      <Faq />
    </>
  );
};

export default HomePage;
