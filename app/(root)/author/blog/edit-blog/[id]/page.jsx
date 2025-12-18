"use client";

import { getPostById } from "@/actions/blog.actions";
import EditBlog from "@/app/(root)/_components/EditBlog";
import LoadingIcon from "@/components/global/loading";
import { BlogContext } from "@/lib/BlogContext";

import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { id } = useParams();
  const { blogData, setBlogData } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const result = await getPostById(id);
      console.log(id, result);

      if (result.success) {
        setBlogData(result.post);
      } else {
        toast.error(result.msg);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id, setBlogData]);

  if (loading)
    return (
      <div className='flex justify-center items-center w-full'>
        <LoadingIcon />
      </div>
    );

  return (
    <div className='flex  gap-4 py-4 md:gap-6 md:py-6 max-w-3xl mx-auto w-full'>
      <div className='w-full'>
        <EditBlog id={id} />
      </div>
    </div>
  );
};

export default Page;
