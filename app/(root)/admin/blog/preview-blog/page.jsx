// "use client";

import React from "react";
import SeeBlog from "../../../_components/PreviewBlog";

const PreviewBlogContainer = async () => {
  return (
    <div className='flex flex-1 flex-col '>
      <div className='flex flex-1 flex-col gap-2 '>
        <div className='flex  gap-4 px-4 md:px-8 py-4 md:gap-6 md:py-12 w-full'>
          <div className='w-full'>
            <SeeBlog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewBlogContainer;
