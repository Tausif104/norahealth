"use client";

import { useState, useEffect, useActionState } from "react";
import Image from "next/image";
import { CircleCheckBig } from "lucide-react";

import { Toaster, toast } from "sonner";
import { createComment } from "@/actions/blog.actions";

const BlogDetails = ({ post }) => {
  const initialState = { success: false, msg: "" };
  const [state, formAction, isLoading] = useActionState(
    createComment,
    initialState
  );

  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    if (state?.success) toast.success(state.msg);
    else if (state?.msg) toast.error(state.msg);
  }, [state]);

  /* ---------------- EditorJS Renderer ---------------- */

  const renderBlock = (block, i) => {
    if (!block?.type || !block?.data) return null;

    switch (block.type) {
      case "header": {
        const Tag = `h${block.data.level || 2}`;
        return (
          <Tag
            key={i}
            className='mt-8 mb-3 text-xl font-semibold text-gray-900'
          >
            {block.data.text}
          </Tag>
        );
      }

      case "paragraph":
        return (
          <p
            key={i}
            className='text-gray-700 leading-relaxed mb-4'
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );

      case "list":
        return (
          <ul key={i} className='space-y-2 mb-5'>
            {block.data.items.map((item, idx) => (
              <li key={idx} className='flex gap-2 text-gray-700'>
                <CircleCheckBig size={16} className='mt-1 text-green-600' />
                {item}
              </li>
            ))}
          </ul>
        );

      case "image":
        return (
          <div key={i} className='my-6 rounded-xl overflow-hidden'>
            <img
              src={block.data.file?.url}
              alt={block.data.caption || "Blog image"}
              className='w-full object-cover'
            />
          </div>
        );

      case "quote":
        return (
          <blockquote
            key={i}
            className='border-l-4 border-orange-500 pl-4 italic text-gray-600 my-6'
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );

      default:
        return null;
    }
  };

  const approvedComments = post.Comment?.filter((c) => c.approved) || [];

  const content = JSON.parse(post.content || "{}");

  return (
    <section className='section-padding'>
      <div className='container custom-container mx-auto'>
        {/* HERO */}
        <div className='relative h-[420px] w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden'>
          <img
            src={post.bannerImage}
            alt={post.title}
            className='absolute inset-0  w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/40 flex items-end'>
            <div className='max-w-5xl mx-auto px-6 pb-10'>
              <h1 className='text-white text-3xl md:text-4xl font-semibold leading-snug'>
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className='max-w-5xl mx-auto px-6 mt-10'>
          {/* AUTHOR */}
          <div className='flex items-center gap-3 text-sm text-gray-600 mb-6'>
            <Image
              src={
                post.author?.account?.profileImage || "/images/user-circle.png"
              }
              width={36}
              height={36}
              className='rounded-full'
              alt='Author'
            />
            <span className='font-medium text-gray-800'>
              {post.author?.name}
            </span>
            <span>•</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* BLOG BODY */}
          <article className='prose prose-lg max-w-none'>
            {content?.blocks?.map(renderBlock)}
          </article>

          {/* COMMENTS */}
          <div className='mt-16'>
            <h3 className='text-xl font-semibold mb-6'>Leave a Reply</h3>

            <form action={formAction} className='space-y-4 mb-10'>
              <input type='hidden' name='postId' value={post.id} />

              <div className='grid md:grid-cols-2 gap-4'>
                <input
                  name='name'
                  placeholder='Full Name'
                  className='border rounded-lg px-4 py-3'
                />
                <input
                  name='email'
                  placeholder='Email Address'
                  className='border rounded-lg px-4 py-3'
                />
              </div>

              <textarea
                name='content'
                rows='4'
                placeholder='Write your comment'
                className='border rounded-lg px-4 py-3 w-full'
              />

              <button
                disabled={isLoading}
                className='bg-[#CD8936] cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-black transition'
              >
                {isLoading ? "Submitting..." : "Submit Comment"}
              </button>
            </form>

            {/* COMMENTS LIST */}
            {approvedComments.length > 0 && (
              <>
                <h4 className='text-lg font-semibold mb-4'>
                  {approvedComments.length} Comment
                  {approvedComments.length > 1 && "s"}
                </h4>

                <div className='space-y-6'>
                  {approvedComments
                    .slice(0, visibleComments)
                    .reverse()
                    .map((c) => (
                      <div key={c.id} className='border-b pb-4'>
                        <p className='font-medium'>{c.name}</p>
                        <p className='text-sm text-gray-500 mb-1'>
                          {new Date(c.createdAt).toDateString()}
                        </p>
                        <p className='text-gray-700'>{c.content}</p>
                      </div>
                    ))}
                </div>

                {visibleComments < approvedComments.length && (
                  <button
                    onClick={() => setVisibleComments((p) => p + 5)}
                    className='mt-6 text-orange-500 font-medium'
                  >
                    Load more comments
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
