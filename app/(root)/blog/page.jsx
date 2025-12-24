import { allPosts } from "@/actions/blog.actions";
import PageBanner from "@/components/global/page-banner";
import React from "react";
import BlogList from "./_components/blog-list";

const page = async () => {
  const allPost = await allPosts();
  console.log(allPost);

  return (
    <>
      <PageBanner
        title='Stay Informed. Stay Healthy.'
        subTitle='Welcome to the Nora Health blog. Your trusted resource for expert health advice and helpful tips.'
      />
      <BlogList allPost={allPost} />
    </>
  );
};

export default page;
