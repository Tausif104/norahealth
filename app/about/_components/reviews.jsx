'use client'

import 'slick-carousel/slick/slick.css'
import { useRef } from 'react'
import Slider from 'react-slick'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ReviewItem from '@/components/global/review-item'
import { testimonials } from '@/data/testimonials'

const ReviewsSection = () => {
  const sliderRef = useRef(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    rows: 2,
    speed: 1000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          rows: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          rows: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          rows: 1,
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  }

  return (
    <section className='section-bottom-padding md:pt-0 pt-[60px]'>
      <div className='container mx-auto custom-container sm:px-0 px-[24px]'>
        <div className='flex items-center md:justify-between justify-center md:mb-[50px] mb-[20px]'>
          <h2 className='text-heading md:text-left text-center xl:text-5xl lg:text-4xl text-2xl font-semibold leading-[1.2]'>
            Patient Stories
          </h2>
          <div className='md:flex hidden gap-4'>
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

        <div className='review-slide'>
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((item) => (
              <ReviewItem key={item.id} item={item} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
