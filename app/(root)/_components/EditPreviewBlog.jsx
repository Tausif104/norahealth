"use client";

import { startTransition, useContext, useEffect, useState } from "react";

import { ArrowLeft, ArrowUpRight, CircleCheckBig } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BlogContext } from "@/lib/BlogContext";
import { Button } from "@/components/ui/button";
import { postUpdate } from "@/actions/blog.actions";
import { loggedInUserAction } from "@/actions/user.action";

const EditSeeBlog = () => {
  const router = useRouter();
  const { blogData, setBlogData } = useContext(BlogContext);
  console.log("blogData: Update", blogData);

  if (!blogData) return <p>No blog data available</p>;

  const renderItem = (item) => {
    if (typeof item === "string") return item;

    if (typeof item === "object") {
      if ("content" in item) return item.content;
      if ("text" in item) return item.text;
      return JSON.stringify(item);
    }

    return String(item);
  };

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

  // const handlePublish = (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     title: blogData.title,
  //     shortDesc: blogData.shortDesc,
  //     image: blogData.image,
  //     content: JSON.stringify(blogData.content),
  //     blogCategoryId: blogData.categoryId,
  //     authorId: userId,
  //   };

  //   console.log("Publishing blog data:", formData);

  //   setBlogData({
  //     title: "",
  //     shortDesc: "",
  //     content: null,
  //     image: "/banner.png",
  //     categories: [],
  //   });
  // };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await loggedInUserAction();
      setUser(res?.payload);
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", blogData.id);
    formData.append("title", blogData.title);
    formData.append("shortDesc", blogData.shortDesc);
    formData.append("bannerImage", blogData.image);

    // formData.append("blogCategoryId", blogData.categoryId);

    // Append content blocks as JSON string
    formData.append("content", JSON.stringify(blogData.content));

    startTransition(async () => {
      try {
        const response = await postUpdate(null, formData);

        if (response?.success) {
          toast.success(response.msg);
          if (user?.role === "AUTHOR") {
            router.push("/author/blog");
          } else if (user?.role === "ADMIN" || user?.role === "SUPERADMIN") {
            router.push("/admin/blog");
          }

          setBlogData({
            title: "",
            shortDesc: "",
            content: null,
            image: "/banner.png",
            categories: [],
          });
        } else {
          toast.error(response?.msg || "Failed to publish blog");
        }
      } catch (err) {
        console.error("publish error:", err);
        toast.error("Server error while publishing blog");
      }
    });
  };
  return (
    <form
      onSubmit={handleUpdate}
      className=' p-6 transition-colors duration-300'
    >
      <input type='hidden' name='title' value={blogData.title} />
      <input type='hidden' name='shortDesc' value={blogData.shortDesc} />
      <input type='hidden' name='image' value={blogData.image} />
      <input
        type='hidden'
        name='content'
        value={JSON.stringify(blogData.content)}
      />

      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-xl font-bold'>Preview</h3>
        <Link href={`/author/blog/edit-blog/${blogData.id}`}>
          <Button type='button' className='w-full'>
            <ArrowLeft /> Back to Edit
          </Button>
        </Link>
      </div>

      {blogData.bannerImage && (
        <img
          src={blogData.bannerImage}
          alt={blogData.title}
          className='w-full h-[400px] object-cover mb-6 border border-white/10 rounded-lg'
        />
      )}

      <h1 className='text-3xl font-bold mb-6'>{blogData.title}</h1>

      {blogData.shortDesc && (
        <p className='text-gray-800 mb-4'>{blogData.shortDesc}</p>
      )}

      {blogData.content?.blocks?.map((block, index) =>
        renderBlock(block, index)
      )}

      <div className='mt-6 flex justify-end'>
        <Button type='submit' className='w-full bg-theme'>
          Publish Now
          <ArrowUpRight />
        </Button>
      </div>
    </form>
  );
};

export default EditSeeBlog;
