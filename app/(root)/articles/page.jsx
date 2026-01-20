import { allPosts } from "@/actions/blog.actions";
import PageBanner from "@/components/global/page-banner";
import React from "react";
import BlogList from "./_components/blog-list";

export const metadata = {
  title: "Articles",
  description: "Free Oral Contraception, Delivered to Your Door",
};

const page = async () => {
  const allPost = await allPosts();
  // console.log(allPost);

  return (
    <>
      <PageBanner
        title='Stay Informed. Stay Healthy.'
        subTitle='Your trusted space for clear answers, practical tips, and expert guidance on health and wellbeing.'
        subTitle2='At Nora Health, we believe healthcare should be accessible, stigma free, and genuinely helpful. Our blogs combine clinical expertise with real world experience to give you information that’s accurate, inclusive, and easy to understand.'
        subTitle3='Whether you’re exploring contraception options, navigating women’s health concerns, or looking for everyday wellness advice, each article is designed to empower you with clarity and confidence.'
      />
      <BlogList allPost={allPost} />
    </>
  );
};

export default page;
