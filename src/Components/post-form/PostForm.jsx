// 

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/config";
import { data, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import { useParams } from "react-router-dom";

// function EditPostPage() {
//   const { postId } = useParams();
//   console.log("Post ID from route:", postId);
//   const [post, setPost] = React.useState(null);

//   React.useEffect(() => {
//     async function fetchPost() {
//       try {
//         const fetchedPost = await service.getPost(postId);
//         console.log("Fetched post:", fetchedPost); // Debug the fetched post
//         setPost(fetchedPost);
//     } catch (error) {
//         console.error("Failed to fetch post:", error);
//     }
//     }
//     fetchPost();
//   }, [postId]);
// 
  // return <PostForm post={post} />;
// }

function EditPostPage() {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
      async function fetchPost() {
          try {
              const fetchedPost = await service.getPost(postId);
              console.log("Fetched post:", fetchedPost); // Debug the fetched post
              setPost(fetchedPost);
          } catch (error) {
              console.error("Failed to fetch post:", error);
          }
      }
      fetchPost();
  }, [postId]);

  if (!post) {
      return <p>Loading post...</p>; // Show a loading message while fetching the post
  }

  return <PostForm post={post} />;
}

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
        username: post?.username ||"Unknown",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // const submit = async (data) => {
  //   if (post) {
  //     const file = data.Image?.[0] ? await service.uploadFile(data.Image[0]) : null;

  //     if (file) {
  //       await service.deleteFile(post.img);
  //     }

  //     const dbPost = await service.updatePost(post.$id, {
  //       ...data,
  //       img: file ? file.$id : undefined,
  //     });

  //     if (dbPost) {
  //       navigate(`/post/${dbPost.$id}`);
  //     }
  //   } else {
  //     if (data.Image?.[0]) {
  //       const file = await service.uploadFile(data.Image[0]);

  //       if (file) {
  //         data.img = file.$id;
  //       }
  //     }

  //     const dbPost = await service.createPost({
  //       ...data,
  //       userId: userData.$id,
  //     });

  //     if (dbPost) {
  //       navigate(`/post/${dbPost.$id}`);
  //     }
  //   }
  // };

  const submit = async (data) => {
    let fileId = null;

    if (data.image?.[0]) {
        try {
            const file = await service.uploadFile(data.image[0]);
            fileId = file?.$id || null;
        } catch (error) {
            console.error("File upload failed:", error);
        }
    }

    data.img = fileId; // Replace with a valid default image ID

    if (post) {
        const dbPost = await service.updatePost(post.$id, {
            ...data,
            // username:data.username || "Unknown", 
        });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    } else {
        const dbPost = await service.createPost({
            ...data,
            userId: userData.$id,
            // username: data.username,
        });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    }
};

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.img && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.img)}
              alt={post.title || "Post Image"}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
         {/* <Input
          label="Username :"
          placeholder="Enter your username"
          className="mb-4"
          {...register("username")}
        /> */}
    
        <Button type="submit" bgColor={post ? "bg-white" : undefined} className="w-full">
          {/* console.log("PostForm: post", post); */}
          {post ? "Update Post" : "Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;