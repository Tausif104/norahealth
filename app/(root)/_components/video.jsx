'use client'

import Image from 'next/image'
import { useState } from 'react'
import ReactPlayer from 'react-player'

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hide, setHide] = useState(false)

  const handlePlay = (e) => {
    setHide(true)
    setIsPlaying(true)
  }

  return (
    <section>
      <div
        className={`lg:h-[700px] md:h-[400px] sm:h-[300px] h-[265px] bg-cover bg-center flex items-center justify-center bg-[url(/images/video-thumb.jpg)] bg-fixed ${
          hide && 'hidden'
        }`}
      >
        <button onClick={handlePlay} className='cursor-pointer'>
          <Image
            src='/images/play-icon.png'
            width={100}
            height={100}
            alt='Play Icon'
            className='md:w-[100px] w-[50px]'
          />
        </button>
      </div>
      <div className={!hide ? 'hidden' : ''}>
        <ReactPlayer
          width='100%'
          height='700px'
          playing={isPlaying}
          src='https://www.youtube.com/watch?v=G5RpJwCJDqc'
        />
      </div>
    </section>
  )
}

export default VideoSection
