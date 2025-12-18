"use client";

import { BlogContext } from "@/lib/BlogContext";
import React, { useContext, useEffect, useState } from "react";

import { toast } from "sonner";

const CategoryAdd = () => {
  const { blogData, setBlogData } = useContext(BlogContext);
  const [loading, setLoading] = useState(false); // loading state

  const MAX_CHAR = 200;
  const shortDesc = blogData.shortDesc || "";
  const remaining = MAX_CHAR - shortDesc.length;

  const handleDescChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHAR) {
      setBlogData((prev) => ({ ...prev, shortDesc: value }));
    }
  };

  return (
    <div>
      <div className=' transition-colors duration-300'>
        {/* <p className='text-gray-800 mb-2 text-lg'>Select Categories</p> */}

        <div className='mt-5 '>
          <textarea
            placeholder='Short Description'
            rows={4}
            value={shortDesc}
            onChange={handleDescChange}
            className='w-full resize-none mt-4 text-gray-800 placeholder-gray-800 opacity-90 border-b border-gray-400 bg-transparent pb-2 outline-none'
          />
          <div
            className={`text-sm mt-1 flex justify-end ${
              remaining === 0 ? "text-red-500" : "text-gray-400"
            }`}
          >
            {remaining} characters remaining
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;
