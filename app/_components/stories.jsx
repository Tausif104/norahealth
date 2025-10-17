'use client'

import { useRef } from 'react'
import Slider from 'react-slick'
import TestimonialItem from './testimonial-item'
import 'slick-carousel/slick/slick.css'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Stories = () => {
  const sliderRef = useRef(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    speed: 1000,
    autoplaySpeed: 5000,
  }

  const tstimonials = [
    {
      id: 1,
      img: '/images/review-thumb.png',
      body: 'I felt completely reassured using Nora Health. The process was simple and private, and delivery was so quick!',
      rating: 4,
      name: 'Sarah M.',
      age: '28',
    },
    {
      id: 2,
      img: '/images/review-thumb.png',
      body: 'I felt completely reassured using Nora Health. The process was simple and private, and delivery was so quick!',
      rating: 2,
      name: 'Sarah M.',
      age: '28',
    },
    {
      id: 3,
      img: '/images/review-thumb.png',
      body: 'I felt completely reassured using Nora Health. The process was simple and private, and delivery was so quick!',
      rating: 5,
      name: 'Sarah M.',
      age: '28',
    },
    {
      id: 4,
      img: '/images/review-thumb.png',
      body: 'I felt completely reassured using Nora Health. The process was simple and private, and delivery was so quick!',
      rating: 3,
      name: 'Sarah M.',
      age: '28',
    },
  ]

  return (
    <section className='section-bottom-padding'>
      <div className='container mx-auto custom-container'>
        <div className='flex items-center justify-between mb-[50px]'>
          <h2 className='text-heading text-5xl font-semibold leading-[1.2]'>
            Patient Stories
          </h2>
          <div className='flex gap-4'>
            <span
              className='w-[56px] h-[56px] text-theme border border-[#CE8936] bg-transparent hover:bg-[#CE8936] flex text-white items-center justify-center rounded-full cursor-pointer transition duration-300 hover:text-white'
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <ArrowLeft />
            </span>
            <span
              className='w-[56px] h-[56px] text-theme border border-[#CE8936] bg-transparent hover:bg-[#CE8936] flex text-white items-center justify-center rounded-full cursor-pointer transition duration-300 hover:text-white'
              onClick={() => sliderRef.current?.slickNext()}
            >
              <ArrowRight />
            </span>
          </div>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {tstimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Stories
