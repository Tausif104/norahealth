"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { ArrowUpRight, Loader2 } from "lucide-react";

import { generateBlogId } from "@/lib/utils";
import LoadingIcon from "@/components/global/loading";
import { BlogContext } from "@/lib/BlogContext";
import { Button } from "@/components/ui/button";
import { loggedInUserAction } from "@/actions/user.action";
// import AddBlogEditorTwo from "./AddBlogEdittorTwo";

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const AddBlogEditor = dynamic(() => import("./AddBlogEditor"), {
  ssr: false,
});

export default function AddBlog() {
  const { blogData, setBlogData } = useContext(BlogContext);

  const [title, setTitle] = useState(blogData.title || "");
  const [slug, setSlug] = useState(blogData.postSlug || "");
  const [preview, setPreview] = useState(
    blogData.image || "/images/blog-banner.png"
  );
  const [uploading, setUploading] = useState(false);
  const [bannerAlt, setBannerAlt] = useState(blogData.bannerAltText || "");
  const [metaTitle, setMetaTitle] = useState(blogData.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    blogData.metaDescription || ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(blogData.canonicalUrl || "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [canonicalEdited, setCanonicalEdited] = useState(false);
  const fileInputRef = useRef();

  // const updateTitleContext = useRef(
  //   debounce((value) => {
  //     const generatedSlug = generateBlogId(value);
  //     setSlug((prev) => (prevEdited ? prev : generatedSlug));
  //     setBlogData((prev) => ({
  //       ...prev,
  //       title: value,
  //       postSlug: generatedSlug,
  //     }));
  //   }, 300)
  // ).current;
  const updateTitleContext = useRef(
    debounce((value) => {
      const generatedSlug = generateBlogId(value);
      setSlug((prev) => (slugEdited ? prev : generatedSlug)); // ← use slugEdited here
      setCanonicalUrl((prev) => (canonicalEdited ? prev : generatedSlug)); // ← use slugEdited here
      setBlogData((prev) => ({
        ...prev,
        title: value,
        postSlug: slugEdited ? prev.postSlug : generatedSlug,
        canonicalUrl: canonicalEdited ? prev.canonicalUrl : generatedSlug,
      }));
    }, 300)
  ).current;

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    updateTitleContext(value);
  };

  const handleTitleResize = (e) => {
    const input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempPreview = URL.createObjectURL(file);
    setPreview(tempPreview);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const finalUrl = data.url || tempPreview;
      setPreview(finalUrl);

      setBlogData((prev) => ({ ...prev, image: finalUrl }));
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const handleSlugChange = (e) => {
    const value = e.target.value;
    setSlug(value);
    setSlugEdited(true); // mark as manually edited
    setBlogData((prev) => ({ ...prev, postSlug: value }));
  };
  const handleBannerAltChange = (e) => {
    const value = e.target.value;
    setBannerAlt(value);
    setBlogData((prev) => ({ ...prev, bannerAltText: value }));
  };

  const handleMetaTitleChange = (e) => {
    const value = e.target.value;
    setMetaTitle(value);
    setBlogData((prev) => ({ ...prev, metaTitle: value }));
  };

  const handleMetaDescriptionChange = (e) => {
    const value = e.target.value;
    setMetaDescription(value);
    setBlogData((prev) => ({ ...prev, metaDescription: value }));
  };

  const handleCanonicalUrlChange = (e) => {
    const value = e.target.value;

    setCanonicalEdited(true);
    setCanonicalUrl(value);
    setBlogData((prev) => ({ ...prev, canonicalUrl: value }));
  };

  const MAX_CHAR = 200;
  const shortDesc = blogData.shortDesc || "";
  const remaining = MAX_CHAR - shortDesc.length;

  const handleDescChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHAR) {
      setBlogData((prev) => ({ ...prev, shortDesc: value }));
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

  console.log(blogData, user, "blogData add");

  return (
    <div className=''>
      <h1 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
        New Blog
      </h1>

      <div
        className='mb-6 cursor-pointer w-full h-[400px] border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden relative hover:ring-2 hover:ring-indigo-500 transition-all duration-300'
        onClick={() => fileInputRef.current.click()}
      >
        <img
          src={preview}
          alt='Blog Banner'
          className='w-full h-full object-cover'
        />
        {uploading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
            <LoadingIcon />
          </div>
        )}
      </div>

      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
      />

      {/* Banner Alt Text */}
      <div>
        <label
          htmlFor='bannerAltText'
          className='text-gray-900 dark:text-white text-lg font-semibold mb-3 block'
        >
          Banner Alt Text
        </label>
        <input
          id='bannerAltText'
          type='text'
          placeholder='banner alt text'
          value={bannerAlt}
          onChange={handleBannerAltChange}
          className='text-base font-semibold w-full outline-none resize-none overflow-hidden !mb-3 leading-snug placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-xl p-4 border border-gray-300 dark:border-gray-700 pb-3 bg-transparent transition-colors duration-300 '
        />
      </div>
      <div>
        <label
          htmlFor='title'
          className='text-gray-900 dark:text-white text-lg font-semibold mb-3 block'
        >
          Blog Title
        </label>
        <input
          placeholder='Blog Title'
          value={title}
          onChange={handleTitleChange}
          onInput={handleTitleResize}
          className='text-base font-semibold w-full outline-none resize-none overflow-hidden mb-6 leading-snug placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white p-4 rounded-xl border border-gray-300 dark:border-gray-700 pb-3 bg-transparent transition-colors duration-300'
        />
      </div>

      {/* short Description */}

      <div className='mt-5 '>
        <label
          htmlFor='shortDesc'
          className='text-gray-900 dark:text-white text-lg font-semibold mb-3 block'
        >
          Short Description
        </label>
        <textarea
          id='shortDesc'
          placeholder='Short Description'
          rows={4}
          value={shortDesc}
          onChange={handleDescChange}
          className='text-base font-semibold w-full outline-none resize-none overflow-hidden  leading-snug placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white p-4 rounded-xl border border-gray-300 dark:border-gray-700  bg-transparent transition-colors duration-300'
        />
        <div
          className={`text-sm mt-0 flex justify-end ${
            remaining === 0 ? "text-red-500" : "text-gray-400"
          }`}
        >
          {remaining} characters remaining
        </div>
      </div>

      {/* Editable Slug */}
      <div>
        <label
          htmlFor='slug'
          className='text-gray-900 dark:text-white text-lg font-semibold mb-3 block'
        >
          Post Slug
        </label>

        <input
          id='slug'
          type='text'
          placeholder='Post Slug (editable)'
          value={slug}
          onChange={handleSlugChange}
          className='text-base font-medium w-full outline-none resize-none overflow-hidden mb-6 leading-snug placeholder-gray-500 dark:placeholder-gray-400 text-gray-500 dark:text-white p-4 rounded-xl border border-gray-300 dark:border-gray-700 pb-3 bg-transparent transition-colors duration-300 pt-3'
        />
      </div>

      {/* SEO Meta Title */}
      <div>
        <label
          htmlFor='metaTitle'
          className='text-gray-900 dark:text-white text-lg font-semibold mb-3 block'
        >
          Meta Title (SEO)
        </label>

        <input
          id='metaTitle'
          type='text'
          placeholder='Meta Title (SEO)'
          value={metaTitle}
          onChange={handleMetaTitleChange}
          className='text-base font-medium w-full outline-none resize-none overflow-hidden mb-6 leading-snug placeholder-gray-500 dark:placeholder-gray-400 text-gray-500 dark:text-white p-4 rounded-lg border border-gray-300 dark:border-gray-700 pb-3 bg-transparent transition-colors duration-300 pt-3'
        />
      </div>

      {/* SEO Meta Description */}
      <div>
        <label
          htmlFor='metaDescription'
          className='text-gray-900 dark:text-white text-lg font-semibold mb-3 block'
        >
          Meta Description (SEO)
        </label>

        <textarea
          id='metaDescription'
          placeholder='Meta Description (SEO)'
          value={metaDescription}
          onChange={handleMetaDescriptionChange}
          className='text-base p-4 font-medium w-full outline-none resize-none overflow-hidden mb-6 leading-snug placeholder-gray-500 dark:placeholder-gray-400 text-gray-500 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 pb-3 bg-transparent transition-colors duration-300'
          rows={3}
        />
      </div>

      {/* SEO Canonical Url */}
      <div>
        <label
          htmlFor='canonicalUrl'
          className='text-gray-900 dark:text-white text-lg font-semibold mb-3 block'
        >
          Canonical URL (SEO)
        </label>

        <input
          id='canonicalUrl'
          type='text'
          placeholder='Canonical URL (SEO)'
          value={canonicalUrl}
          onChange={handleCanonicalUrlChange}
          className='text-base p-4 font-medium w-full outline-none resize-none overflow-hidden mb-6 leading-snug placeholder-gray-500 dark:placeholder-gray-400 text-gray-500 dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 pb-3 bg-transparent transition-colors duration-300 pt-3'
        />
      </div>

      <AddBlogEditor preview={preview} />

      <div className='mt-6 flex justify-end'>
        {user && (
          <Link
            href={
              user.role === "AUTHOR"
                ? "/author/blog/preview-blog"
                : user.role === "ADMIN" || user.role === "SUPERADMIN"
                ? "/admin/blog/preview-blog"
                : "/"
            }
          >
            <Button
              type='submit'
              className='w-full !text-white !cursor-pointer bg-theme'
              disabled={uploading}
            >
              {uploading ? (
                <span className='flex items-center justify-center gap-2'>
                  <Loader2 className='h-5 w-5 animate-spin' />
                </span>
              ) : (
                <span className='flex gap-3 items-center '>
                  See Preview <ArrowUpRight />
                </span>
              )}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
