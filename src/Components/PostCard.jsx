import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

export default function PostCard({ post }) {
    return (
        <div className="border rounded-xl p-4 bg-white shadow">
            {/* Post Image */}
            <img
                src={appwriteService.getFilePreview(post.img)}
                alt={post.title}
                // alt="img"
                className="rounded-xl w-full"
            />

            {/* Post Title */}
            <h2 className="text-xl font-bold mt-2">{post.title}</h2>

            {/* ✅ Show the username */}
            <p className="text-white text-sm">By: {post.username || "Unknown"}</p>

            {/* Read More Button */}
            <Link to={`/post/${post.$id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-3">
                    Read More
                </button>
            </Link>
        </div>
    );
}
