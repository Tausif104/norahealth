"use server";

import { revalidatePath } from "next/cache";
import { loggedInUserAction } from "./user.action";
import { prisma } from "@/lib/client/prisma";

/** ---------- Helpers ---------- */
function getString(v) {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Accepts `content` as:
 * 1) multiple inputs with the same name: formData.getAll("content")
 * 2) a single JSON string: '["para1","para2"]'
 * 3) a single newline-separated string
 */

/** ---------- List Posts ---------- */

// export const postList = async () => {
//   try {
//     // Get logged-in user session
//     const user = await loggedInUserAction();

//     if (!user?.payload?.id) {
//       return { success: false, msg: "Unauthorized" };
//     }

//     const posts = await prisma.post.findMany({
//       where: {
//         authorId: Number(user?.payload?.id), // ✅ only this author’s posts
//       },
//       orderBy: { createdAt: "desc" },
//       include: {
//         author: {
//           select: {
//             id: true,
//             email: true,
//             account: {
//               select: {
//                 id: true,
//                 profileImage: true,
//                 firstName: true,
//               },
//             },
//           },
//         },
//         Comment: {
//           orderBy: { createdAt: "asc" },
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             content: true,
//             createdAt: true,
//             updatedAt: true,
//           },
//         },
//       },
//     });

//     // Parse content string → object
//     const postsWithContentObj = posts.map((post) => ({
//       ...post,
//       content: post.content ? JSON.parse(post.content) : null,
//     }));

//     return {
//       success: true,
//       msg: "Posts fetched successfully",
//       postsWithContentObj,
//     };
//   } catch (err) {
//     console.error("postList error:", err);
//     return { success: false, msg: "Failed to fetch posts" };
//   }
// };

export const allPosts = async () => {
  const posts = await prisma.post.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
      Comment: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          name: true,
          email: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return {
    success: true,
    msg: "Posts fetched successfully",
    postsWithContentObj: posts,
  };
};

export const postList = async () => {
  try {
    const user = await loggedInUserAction();

    if (!user?.payload?.id) {
      return { success: false, msg: "Unauthorized" };
    }

    const { id, role } = user.payload;

    const isAdmin = role === "ADMIN" || role === "SUPERADMIN";

    const posts = await prisma.post.findMany({
      where: isAdmin
        ? {} // ✅ fetch ALL posts
        : { authorId: Number(id) }, // ✅ only own posts

      orderBy: { createdAt: "desc" },

      include: {
        author: {
          select: {
            id: true,
            email: true,
            account: {
              select: {
                id: true,
                profileImage: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        Comment: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            name: true,
            email: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    const postsWithContentObj = posts.map((post) => ({
      ...post,
      content: post.content ? JSON.parse(post.content) : null,
    }));

    return {
      success: true,
      msg: "Posts fetched successfully",
      postsWithContentObj,
    };
  } catch (err) {
    console.error("postList error:", err);
    return { success: false, msg: "Failed to fetch posts" };
  }
};
/** ---------- Create Post ---------- */
export const postCreate = async (_prevState, formData) => {
  const user = await loggedInUserAction();
  console.log(user, "post user");

  try {
    const title = getString(formData.get("title"));
    const postSlug = getString(formData.get("postSlug"));
    const bannerAltText = getString(formData.get("bannerAltText"));
    const metaTitle = getString(formData.get("metaTitle"));
    const metaDescription = getString(formData.get("metaDescription"));
    const canonicalUrl = getString(formData.get("canonicalUrl"));
    const shortDesc = getString(formData.get("shortDesc"));
    const bannerImage = getString(formData.get("bannerImage")); // ✅ now stored
    // const content = parseContent(formData);
    // const contentRaw = formData.get("content");
    const contentRaw = getString(formData.get("content"));
    const authorId = user?.payload?.id; // optional

    if (!title) {
      return {
        success: false,
        msg: "title, shortDesc and content are required",
      };
    }

    const existing = await prisma.post.findFirst({ where: { title } });
    if (existing) {
      return { success: false, msg: "Post with this title already exists" };
    }

    // 🔍 Check existing slug
    const existingSlug = await prisma.post.findUnique({ where: { postSlug } });
    if (existingSlug) {
      return {
        success: false,
        msg: "This post slug is already in use. Please choose a different one.",
      };
    }

    let content;
    try {
      content = JSON.parse(contentRaw); // <-- parse JSON once
    } catch (err) {
      console.error("Invalid JSON content:", err);
      return { success: false, msg: "Content is invalid JSON" };
    }

    const created = await prisma.post.create({
      data: {
        title,
        postSlug, // store generated slug
        shortDesc,
        bannerImage,
        bannerAltText,
        metaTitle,
        metaDescription,
        canonicalUrl,
        content: contentRaw,
        authorId: authorId,
      },
      include: {
        author: { select: { id: true, email: true } },
      },
    });

    return {
      success: true,
      msg: "Post created successfully",
      post: created,
    };
  } catch (err) {
    console.error("postCreate error:", err);
    return { success: false, msg: "Failed to create post" };
  }
};

/** ---------- Update Post ---------- */
// export const postUpdate = async (_prevState, formData) => {
//   try {
//     const id = getString(formData.get("id"));
//     if (!id) return { success: false, msg: "Post id is required" };

//     const title = getString(formData.get("title"));
//     const shortDesc = getString(formData.get("shortDesc"));
//     const bannerImage = getString(formData.get("bannerImage")); // ✅ now stored
//     // const content = parseContent(formData);
//     // const contentRaw = formData.get("content");
//     const contentRaw = getString(formData.get("content"));

//     const data = {};
//     if (title) data.title = title;
//     if (shortDesc) data.shortDesc = shortDesc;
//     if (contentRaw) data.content = contentRaw;
//     if (bannerImage) data.bannerImage = bannerImage;
//     // if (authorId) data.authorId = authorId;
//     // if (blogCategoryId) data.blogCategoryId = blogCategoryId;

//     // if (formData.has("authorId") && !authorId) data.authorId = null;
//     // if (formData.has("blogCategoryId") && !blogCategoryId)
//     //   data.blogCategoryId = null;

//     if (Object.keys(data).length === 0) {
//       return { success: false, msg: "Nothing to update" };
//     }

//     const updated = await prisma.post.update({
//       where: { id },
//       data,
//       include: {
//         author: {
//           select: {
//             id: true,
//             email: true,
//             account: {
//               select: {
//                 firstName: true,
//                 lastName: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return {
//       success: true,
//       msg: "Post updated successfully",
//       post: updated,
//     };
//   } catch (err) {
//     console.error("postUpdate error:", err);
//     return { success: false, msg: "Failed to update post" };
//   }
// };

export const postUpdate = async (_prevState, formData) => {
  try {
    const id = getString(formData.get("id"));
    if (!id) return { success: false, msg: "Post id is required" };

    const title = getString(formData.get("title"));
    const shortDesc = getString(formData.get("shortDesc"));
    const contentRaw = getString(formData.get("content"));

    const bannerImageRaw = formData.get("bannerImage");

    const data = {};

    if (title) data.title = title;
    if (shortDesc) data.shortDesc = shortDesc;
    if (contentRaw) data.content = contentRaw;

    // ✅ SAFE banner image update
    if (typeof bannerImageRaw === "string" && bannerImageRaw.trim() !== "") {
      data.bannerImage = bannerImageRaw.trim();
    }

    if (Object.keys(data).length === 0) {
      return { success: false, msg: "Nothing to update" };
    }

    const updated = await prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            account: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      msg: "Post updated successfully",
      post: updated,
    };
  } catch (err) {
    console.error("postUpdate error:", err);
    return { success: false, msg: "Failed to update post" };
  }
};

/** ---------- Delete Post ---------- */
export const deletePost = async (id) => {
  try {
    const deleted = await prisma.post.delete({
      where: { id },
      include: {
        author: { select: { id: true, email: true } },
      },
    });

    const payload = loggedInUserAction();

    if (payload?.role === "SUPERADMIN" || payload?.role === "ADMIN") {
      // revalidate admin blog path
      revalidatePath("/admin/blog");
    } else {
      // revalidate author blog path
      revalidatePath("/author/blog");
    }

    return {
      success: true,
      msg: "Post deleted successfully",
      post: deleted,
    };
  } catch (err) {
    console.error("deletePost error:", err);
    return { success: false, msg: "Failed to delete post" };
  }
};

export async function togglePostApproval(postId, isActive) {
  try {
    await prisma.post.update({
      where: { id: postId },
      data: { isActive },
    });

    return {
      success: true,
      msg: isActive ? "Blog approved successfully" : "Blog unapproved",
    };
  } catch (error) {
    return {
      success: false,
      msg: "Failed to update approval status",
    };
  }
}

/** ---------- Get Single Post ---------- */

export const getPostById = async (id) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, email: true } },
      },
    });

    if (!post) return { success: false, msg: "Post not found" };

    // Parse content if it's a JSON string
    let parsedContent = {};
    try {
      parsedContent = post.content ? JSON.parse(post.content) : {};
    } catch (err) {
      console.warn("Failed to parse post content, returning empty object");
      parsedContent = {};
    }

    return {
      success: true,
      msg: "Post fetched successfully",
      post: {
        ...post,
        content: parsedContent,
      },
    };
  } catch (err) {
    console.error("getPostById error:", err);
    return { success: false, msg: "Failed to fetch post" };
  }
};

/* =====================================================
   GET SINGLE BLOG BY SLUG (PUBLIC)
===================================================== */
export async function getBlogBySlug(postSlug) {
  console.log(postSlug, "postSlug");

  try {
    const post = await prisma.post.findFirst({
      where: {
        postSlug,
        isActive: true,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,

            account: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
        },

        Comment: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!post) {
      return { success: false, msg: "Blog not found" };
    }

    return { success: true, post };
  } catch (error) {
    return { success: false, msg: "Failed to load blog" };
  }
}

// create Comment

export async function createComment(prevState, formData) {
  try {
    const postId = formData.get("postId");
    const name = formData.get("name");
    const email = formData.get("email");
    const content = formData.get("content");

    if (!postId || !name || !email || !content) {
      return { success: false, msg: "All fields are required" };
    }

    await prisma.comment.create({
      data: {
        postId,
        name,
        email,
        content,
        approved: false, // admin approval required
      },
    });

    return {
      success: true,
      msg: "Comment submitted and awaiting approval",
    };
  } catch (error) {
    return { success: false, msg: "Failed to submit comment" };
  }
}

// approve Comment
export async function approveComment(commentId) {
  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: { approved: true },
    });

    return { success: true, msg: "Comment approved" };
  } catch (error) {
    return { success: false, msg: "Approval failed" };
  }
}

// delete Comment
export async function deleteComment(commentId) {
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return { success: true, msg: "Comment deleted" };
  } catch (error) {
    return { success: false, msg: "Delete failed" };
  }
}
