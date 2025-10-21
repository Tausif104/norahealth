import PageBanner from '@/components/global/page-banner'
import AboutAlt from './_components/about-alt'
import Mission from './_components/mission'
import TeamSection from './_components/team'

const AboutPage = () => {
  return (
    <>
      <PageBanner title='About Us' />
      <AboutAlt />
      <Mission />
      <TeamSection />
    </>
  )
}

export default AboutPage
