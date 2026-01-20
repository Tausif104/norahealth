import React from "react";
import BlogDetails from "../_components/blog-details";
import { getBlogBySlug } from "@/actions/blog.actions";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const param = await params;
  console.log(param);

  const { postSlug } = param;
  const res = await getBlogBySlug(postSlug);
  console.log(res, "blog details page");

  if (!res?.success || !res?.post) {
    notFound();
  }

  return (
    <>
      <BlogDetails post={res.post} />
    </>
  );
};

export default page;
