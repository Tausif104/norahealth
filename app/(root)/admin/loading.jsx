import { LoaderIcon } from 'lucide-react'

const Loading = () => {
  return (
    <>
      <div className='w-full justify-center items-center h-[30vh] flex'>
        <span>
          <LoaderIcon
            role='status'
            aria-label='Loading'
            className='size-5 animate-spin mx-auto'
          />
        </span>
      </div>
    </>
  )
}

export default Loading
