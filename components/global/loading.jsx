import { LoaderIcon } from 'lucide-react'

const LoadingIcon = () => {
  return (
    <div className='w-full justify-center items-center h-[60vh] flex'>
      <span>
        <LoaderIcon
          role='status'
          aria-label='Loading'
          className='size-5 animate-spin mx-auto'
        />
      </span>
    </div>
  )
}

export default LoadingIcon
