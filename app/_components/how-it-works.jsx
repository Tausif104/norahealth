import IconCard from '@/components/global/icon-card'
import { howItWorks } from '@/data/how-it-works'

const HowItWorks = () => {
  return (
    <section className='section-bottom-padding'>
      <div className='container custom-container mx-auto sm:px-0 px-[24px]'>
        <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl font-semibold text-center sm:mb-[50px] mb-[30px]'>
          How It Works
        </h2>

        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:gap-5 gap-4'>
          {howItWorks.map((item, index) => (
            <IconCard
              index={index + 1}
              key={item.id}
              img={item.img}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
