import React from "react";
import TermsSection from "./_components/legal-policies";
import PageBanner from "@/components/global/page-banner";

const page = () => {
  return (
    <>
      <PageBanner title='Legal & Policies' update='14 Dec 2025' />
      <TermsSection />
    </>
  );
};

export default page;
