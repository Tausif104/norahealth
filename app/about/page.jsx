import PageBanner from '@/components/global/page-banner'
import AboutAlt from './_components/about-alt'
import Mission from './_components/mission'
import TeamSection from './_components/team'
import StatisticsBoxes from './_components/statistics'
import VideoSection from '../_components/video'
import ReviewsSection from './_components/reviews'

const AboutPage = () => {
  return (
    <>
      <PageBanner title='About Us' />
      <AboutAlt />
      <Mission />
      <TeamSection />
      <VideoSection />
      <StatisticsBoxes />
      <ReviewsSection />
    </>
  )
}

export default AboutPage
