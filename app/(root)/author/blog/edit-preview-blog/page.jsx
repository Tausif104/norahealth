// "use client";

import EditSeeBlog from "@/app/(root)/_components/EditPreviewBlog";
import React from "react";

const PreviewBlogContainer = async () => {
  return (
    <div className='flex  gap-4 py-4 md:gap-6 md:py-6 max-w-3xl mx-auto w-full'>
      <div className='w-full'>
        <EditSeeBlog />
      </div>
    </div>
  );
};

export default PreviewBlogContainer;
