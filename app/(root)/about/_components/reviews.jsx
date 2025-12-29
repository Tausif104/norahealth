"use client";

import "slick-carousel/slick/slick.css";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReviewItem from "@/components/global/review-item";
import { testimonials } from "@/data/testimonials";

const ReviewsSection = () => {
  const sliderRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const [slidesToShow, setSlidesToShow] = useState(3);

  const [rows, setRows] = useState(2);

  useEffect(() => {
    setIsClient(true);
    const calc = () => {
      const w = window.innerWidth;

      if (w <= 500) {
        setSlidesToShow(1);
        setRows(1);
      } else if (w <= 991) {
        setSlidesToShow(1);
        setRows(1);
      } else if (w <= 1000) {
        setSlidesToShow(2);
        setRows(1);
      } else {
        setSlidesToShow(3);
        setRows(2);
      }
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [isClient]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    // autoplay: true,
    arrows: false,
    rows: rows,
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
  };

  if (!isClient) {
    return null;
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
  );
};

export default ReviewsSection;
