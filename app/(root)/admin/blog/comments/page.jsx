import { commentList, getPostById } from "@/actions/blog.actions";
import CommentTable from "@/app/(root)/_components/commentTable";

export default async function CommentsPage({ searchParams }) {
  const { postId } = await searchParams;
  console.log(postId);

  if (!postId) return null;
  const post = await getPostById(postId);

  console.log(post);
  const postTitle = post?.success ? post.post.title : "Unknown Post";

  const res = await commentList({ postId });

  return (
    <div className='p-4 md:p-8 w-full'>
      <CommentTable
        comments={res?.success ? res.comments : []}
        postId={postId}
        postTitle={postTitle}
      />
    </div>
  );
}
