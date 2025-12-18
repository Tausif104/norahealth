import { postList } from "@/actions/blog.actions";
import { PanelLeft, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import BlogTable from "../../_components/BlogTable";

const page = async () => {
  const allPost = await postList();
  console.log(allPost, "Blog");

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div className='px-4 lg:px-6'>
            <BlogTable allPost={allPost} userRole='admin' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
