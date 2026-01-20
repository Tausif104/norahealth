import React from "react";
import Link from "next/link";

const BlogList = ({ allPost }) => {
  const posts = allPost?.postsWithContentObj || [];

  return (
    <section className='py-16'>
      <div className='container custom-container mx-auto px-6 sm:px-0'>
        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14'>
          {posts.map((post) => (
            <div key={post.id} className='group'>
              {/* Image */}
              <div className='overflow-hidden rounded-xl'>
                <img
                  src={post.bannerImage}
                  alt={post.title}
                  className='w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>

              {/* Content */}
              <div className='mt-5'>
                <h3 className='text-xl font-semibold text-heading leading-snug mb-3'>
                  {post.title}
                </h3>

                <p className='text-sm text-gray-600 leading-relaxed mb-4'>
                  {post.shortDesc}
                </p>

                {/* CTA */}
                <Link
                  href={`/blog/${post.postSlug}`}
                  className='inline-flex items-center text-sm font-medium text-primary hover:underline'
                >
                  Learn More
                  <span className='ml-1 transition-transform group-hover:translate-x-1'>
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
