"use client";

import { useEffect, useRef } from "react";

export default function VideoSectionHome() {
  const ref = useRef(null);

  useEffect(() => {
    let jarallaxFn;

    (async () => {
      const mod = await import("jarallax");
      jarallaxFn = mod.jarallax;

      jarallaxFn(ref.current, {
        speed: 0.3,
        imgPosition: "50% 50%",
        imgSize: "cover",
      });
    })();

    return () => {
      if (jarallaxFn && ref.current) jarallaxFn(ref.current, "destroy");
    };
  }, []);

  return (
    <section className='relative py-30 overflow-hidden min-h-[800px]'>
      {/* Background */}
      <div ref={ref} className='jarallax absolute inset-0 -z-10'>
        <img
          className='jarallax-img opacity-100  pointer-events-none'
          src='/images/video-thumb.jpg'
          alt=''
        />
      </div>

      {/* Dark overlay */}
      <div className='absolute inset-0 -z-10 bg-black/30' />


      
    </section>
  );
}
