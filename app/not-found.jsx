import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#FFF8EF] px-6'>
      <div className='max-w-xl text-center'>
        {/* 404 */}
        <h1 className='text-[96px] font-bold text-[#CE8936] leading-none'>
          404
        </h1>

        {/* Title */}
        <h2 className='mt-4 text-2xl md:text-3xl font-semibold text-[#3A3D42]'>
          Page Not Found
        </h2>

        {/* Description */}
        <p className='mt-4 text-base text-[#5F6368]'>
          Sorry, the page you’re looking for doesn’t exist or may have been
          moved. Let’s get you back to a safe place.
        </p>

        {/* Actions */}
        <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-full bg-[#CE8936] px-6 py-3 text-white font-medium hover:bg-[#b9772e] transition'
          >
            Go to Home
          </Link>

          <Link
            href='/contact'
            className='inline-flex items-center justify-center rounded-full border border-[#CE8936] px-6 py-3 text-[#CE8936] font-medium hover:bg-[#CE8936] hover:text-white transition'
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
