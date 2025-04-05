import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.img);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-900 text-white">
            <Container>
                {/* Post Image */}
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img
                        src={post.img ? appwriteService.getFilePreview(post.imgs) : "/placeholder.jpg"}
                        alt={post.title || "Post Image"}
                        className="rounded-xl border-none"
                    />
                    
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 text-white" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 text-white" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                </div>

                {/* Post Content */}
                <div className="browser-css text-white">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
