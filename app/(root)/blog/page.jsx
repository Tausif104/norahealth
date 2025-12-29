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
        subTitle='Your trusted space for expert guidance, clear answers, and practical tips to support your health and wellbeing.'
        subTitle2='At Norahealth, we believe that good healthcare should feel accessible, stigma free, and genuinely helpful. Our blog brings together clinical expertise, real world experience, and a deep understanding of the topics people request. Whether you’re exploring contraception options, navigating women’s health concerns, or simply looking for everyday wellness advice, you’ll find information that’s accurate, inclusive, and easy to understand. '
        subTitle3='Each article is designed to empower you—helping you make confident decisions about your body, your health, and your life. From step by step guides to myth busting explainers and practical lifestyle tips, we’re here to support you with clarity and compassion.'
      />
      <BlogList allPost={allPost} />
    </>
  );
};

export default page;
