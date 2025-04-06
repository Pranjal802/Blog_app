import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { ID } from "appwrite";

function PostCard({ $id, title, img }) {
  // console.log("PostCard: image :",post.img);
  // if (!img) {
  //   console.warn("PostCard: No image found for post", $id);
  // }
  const imageUrl = appwriteService.getFilePreview(img);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={imageUrl} alt={title} className="rounded-xl" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );


}

export default PostCard;
