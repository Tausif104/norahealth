import PageBanner from "@/components/global/page-banner";
import React from "react";
import Script from "next/script";

export const metadata = {
  title: "Articles",
  description: "Free Oral Contraception, Delivered to Your Door",
};

// Override Soro's default embed styles to match the native BlogList grid.
// Soro injects its own <style> at runtime, so !important is required to win.
const soroStyles = `
  #soro-blog {
    max-width: none !important;
    margin: 0 !important;
    color: inherit !important;
    font-family: inherit !important;
  }
  #soro-blog .soro-blog-list {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 3.5rem 2rem !important;
  }
  @media (min-width: 640px) {
    #soro-blog .soro-blog-list { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (min-width: 1024px) {
    #soro-blog .soro-blog-list { grid-template-columns: repeat(3, 1fr) !important; }
  }
  #soro-blog .soro-blog-card {
    display: flex !important;
    flex-direction: column !important;
    gap: 0 !important;
    padding: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    background: transparent !important;
  }
  #soro-blog .soro-blog-card:hover {
    box-shadow: none !important;
    border-color: transparent !important;
  }
  #soro-blog .soro-blog-card-image {
    width: 100% !important;
    height: 220px !important;
    object-fit: cover !important;
    border-radius: 12px !important;
    margin-bottom: 1.25rem !important;
  }
  #soro-blog .soro-blog-card-content {
    flex: 1 1 auto !important;
    padding: 0 !important;
  }
  #soro-blog .soro-blog-card-title,
  #soro-blog h2.soro-blog-card-title {
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    line-height: 1.35 !important;
    color: #0d060c !important;
    margin: 0 0 0.75rem 0 !important;
  }
  #soro-blog .soro-blog-card-excerpt {
    font-size: 0.875rem !important;
    line-height: 1.6 !important;
    color: #4b5563 !important;
    margin: 0 0 1rem 0 !important;
  }
  #soro-blog .soro-blog-card-date { display: none !important; }
  #soro-blog .soro-blog-card-content::after {
    content: "Learn More \\2192";
    display: inline-flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: #0d060c;
  }
`;

const page = async () => {
  return (
    <>
      <PageBanner
        title='Stay Informed. Stay Healthy.'
        subTitle='Your trusted space for clear answers, practical tips, and expert guidance on health and wellbeing.'
        subTitle2='At Nora Health, we believe healthcare should be accessible, stigma free, and genuinely helpful. Our blogs combine clinical expertise with real world experience to give you information that’s accurate, inclusive, and easy to understand.'
        subTitle3='Whether you’re exploring contraception options, navigating women’s health concerns, or looking for everyday wellness advice, each article is designed to empower you with clarity and confidence.'
      />

      {/* Soro blog embed styled to match native grid */}
      <style dangerouslySetInnerHTML={{ __html: soroStyles }} />
      <section className="py-16">
        <div className="container custom-container mx-auto px-6 sm:px-0">
          <div id="soro-blog"></div>
        </div>
      </section>
      <Script
        src="https://app.trysoro.com/api/embed/443bdaa5-10f3-4862-8509-3bbe76b02fd2"
        strategy="afterInteractive"
      />
    </>
  );
};

export default page;
