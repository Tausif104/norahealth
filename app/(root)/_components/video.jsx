"use client";

import { useEffect, useRef } from "react";

export default function VideoSection() {
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
    <section className='relative py-30 overflow-hidden'>
      {/* Background */}
      <div ref={ref} className='jarallax absolute inset-0 -z-10'>
        <img
          className='jarallax-img opacity-100  pointer-events-none'
          src='/images/video-thumb.jpg'
          alt=''
        />
      </div>

      {/* Dark overlay */}
      <div className='absolute inset-0 -z-10 bg-black/60' />

      {/* Content */}
      <div className='max-w-5xl mx-auto px-4 text-center text-lg text-white space-y-6'>
        <p className='max-w-4xl mx-auto'>
          My name is Dev and I’m the founder of Nora Health. My journey began in
          Mitcham, South London, where I’ve spent over 10 years supporting my
          local community in providing healthcare by putting the patient at the
          heart of their care. I have a strong belief that high quality care
          shouldn’t depend on where you live, how busy your GP is, or how
          comfortable you feel discussing sensitive topics in person. Nora
          Health was created to support these beliefs.
        </p>

        <p className='max-w-4xl mx-auto'>
          We offer a <strong>completely free service</strong> that offers safe,
          accessible contraception to women across the country — removing the
          barriers that so often stand in the way of essential care. Our trusted
          online services connect patients with a clinical team of experienced
          pharmacists and doctors — with over 15 years of expertise in women's
          health. We know that everyone's different. That's why our advice is
          personal and inclusive — so you feel heard, respected, and supported
          every step of the way.
        </p>

        <p className='max-w-4xl mx-auto'>
          My vision for Nora Health is to grow into the definitive online
          provider for women’s healthcare, offering everything from oral
          contraception to HRT to weight management whilst still providing
          clear, reliable guidance whenever it’s needed.
        </p>

        <p className='max-w-4xl mx-auto font-semibold'>
          At the heart of Nora Health is a simple promise: to support women with
          privacy, compassion, and clinical expertise. We’re here to make
          healthcare feel easier, more dignified, and truly centred around your
          needs. I’m excited for what’s ahead, and we look forward to helping
          you feel confident and in control of your health.
        </p>
      </div>
    </section>
  );
}
