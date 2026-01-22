"use client";
import { decode } from "html-entities";

import { startTransition, useContext, useEffect, useState } from "react";

import { ArrowLeft, ArrowUpRight, CircleCheckBig } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { BlogContext } from "@/lib/BlogContext";
import { Button } from "@/components/ui/button";
import { postCreate } from "@/actions/blog.actions";
import { loggedInUserAction } from "@/actions/user.action";

const SeeBlog = () => {
  const router = useRouter();
  const { blogData, setBlogData } = useContext(BlogContext);
  console.log("blogData:", blogData);

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

  const renderListItemContent = (item) => {
    // normalize to html string
    const html =
      typeof item === "string"
        ? item
        : item && typeof item === "object"
          ? (item.content ?? item.text ?? "")
          : String(item ?? "");

    // decode entities then render
    const safeHtml = decode(html);

    return safeHtml ? (
      <span dangerouslySetInnerHTML={{ __html: safeHtml }} />
    ) : null;
  };

  const renderNestedList = (items, style, keyPrefix = "li") => {
    const ListTag = style === "ordered" ? "ol" : "ul";

    return (
      <ListTag
        className={`pl-6 space-y-2 ${
          style === "ordered" ? "list-decimal" : "list-disc"
        }`}
      >
        {items.map((item, idx) => {
          const key = `${keyPrefix}-${idx}`;
          const children =
            item && typeof item === "object" && Array.isArray(item.items)
              ? item.items
              : null;

          const checked =
            style === "checklist"
              ? (item?.meta?.checked ?? item?.checked ?? false)
              : false;

          return (
            <li key={key}>
              <div className='flex gap-2 text-gray-700'>
                {style === "checklist" ? (
                  <input
                    type='checkbox'
                    checked={checked}
                    readOnly
                    className='mt-1 w-4 h-4'
                  />
                ) : style === "ordered" ? null : (
                  <CircleCheckBig size={16} className='mt-1' />
                )}

                <div>{renderListItemContent(item)}</div>
              </div>

              {children?.length ? renderNestedList(children, style, key) : null}
            </li>
          );
        })}
      </ListTag>
    );
  };

  const renderBlock = (block, i) => {
    if (!block?.type || !block?.data) return null;

    switch (block.type) {
      case "header": {
        const Tag = `h${block.data.level || 2}`;
        const text = decode(block.data.text || "");
        return (
          <Tag key={i} className='mt-8 mb-3 text-xl font-bold text-gray-900'>
            {text}
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

      case "list": {
        const style = block.data?.style || "unordered";
        const items = block.data?.items || [];
        return (
          <div key={i} className='mb-5'>
            {renderNestedList(items, style, `list-${i}`)}
          </div>
        );
      }

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await loggedInUserAction();
      setUser(res?.payload);
    };

    fetchUser();
  }, []);

  const handlePublish = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("postSlug", blogData.postSlug);
    formData.append("bannerAltText", blogData.bannerAltText);
    formData.append("metaTitle", blogData.metaTitle);
    formData.append("metaDescription", blogData.metaDescription);
    formData.append("canonicalUrl", blogData.canonicalUrl);

    formData.append("shortDesc", blogData.shortDesc);
    formData.append("bannerImage", blogData.image);
    // formData.append("authorId", userId);
    // formData.append("blogCategoryId", blogData.categoryId);

    // Append content blocks as JSON string
    formData.append("content", JSON.stringify(blogData.content));

    startTransition(async () => {
      try {
        const response = await postCreate(null, formData);
        console.log("response:", response);

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
      onSubmit={handlePublish}
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
      {/* {blogData.categories?.map((cat, i) => (
        <input key={i} type='hidden' name='categories' value={cat?.id} />
      ))} */}

      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-xl font-bold'>Preview</h3>
        {user && (
          <Link
            href={
              user.role === "AUTHOR"
                ? "/author/blog/add-blog"
                : user.role === "ADMIN" || user.role === "SUPERADMIN"
                  ? "/admin/blog/add-blog"
                  : "/"
            }
          >
            <Button type='button' className='w-full'>
              <ArrowLeft /> Back to Edit
            </Button>
          </Link>
        )}
      </div>

      {blogData.image && (
        <img
          src={blogData.image}
          alt={blogData.title}
          className='w-full h-[400px] object-cover mb-6 border border-white/10 rounded-lg'
        />
      )}

      <h1 className='text-3xl font-bold mb-6'>{blogData.title}</h1>

      {blogData.shortDesc && (
        <p className='text-gray-800 mb-4'>{blogData.shortDesc}</p>
      )}

      {blogData.content?.blocks?.map((block, index) =>
        renderBlock(block, index),
      )}

      <div className='mt-6 flex justify-end'>
        <Button type='submit' className=' bg-theme'>
          Publish Now
          <ArrowUpRight />
        </Button>
      </div>
    </form>
  );
};

export default SeeBlog;
