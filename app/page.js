import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <Button className='cursor-pointer' asChild>
        <a href='#'>Hello</a>
      </Button>
    </>
  )
}

export default HomePage
