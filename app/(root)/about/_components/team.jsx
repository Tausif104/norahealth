import { team } from '@/data/team'
import TeamItem from './team-item'

const TeamSection = () => {
  return (
    <section className='section-padding sm:px-0 px-[24px]'>
      <div className='container custom-container mx-auto'>
        <div className='mb-[50px]'>
          <h2 className='text-heading xl:text-5xl lg:text-4xl text-2xl  font-semibold text-center'>
            Meet the Team
          </h2>
        </div>

        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-5'>
          {team.map((item) => (
            <TeamItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
