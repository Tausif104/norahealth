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
        className={`h-[700px] bg-cover bg-center flex items-center justify-center ${
          hide && 'hidden'
        }`}
        style={{ backgroundImage: `url(/images/video-thumb.jpg)` }}
      >
        <button onClick={handlePlay} className='cursor-pointer'>
          <Image
            src='/images/play-icon.png'
            width={100}
            height={100}
            alt='Play Icon'
          />
        </button>
      </div>
      <div className={!hide ? 'hidden' : ''}>
        <ReactPlayer
          width='100%'
          height='700px'
          playing={isPlaying}
          src='https://www.youtube.com/watch?v=LXb3EKWsInQ'
        />
      </div>
    </section>
  )
}

export default VideoSection
