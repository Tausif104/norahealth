import { LoaderIcon } from 'lucide-react'

const LoadingIcon = () => {
  return (
    <div className='w-full justify-center items-center h-[100vh] flex'>
      <span>
        <LoaderIcon
          role='status'
          aria-label='Loading'
          className='size-10 animate-spin mx-auto'
        />
      </span>
    </div>
  )
}

export default LoadingIcon
