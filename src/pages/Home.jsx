import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../Components/index";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
// import getPosts from ""

export default function Login() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-white">Welcome to Our Blog!</h2>
        <p className="text-gray-500 mb-4 max-w-lg">
          Discover insightful articles, trending stories, and expert opinions
          from writers around the world. Our community shares knowledge on a
          variety of topics, from technology to lifestyle.
        </p>
        <p className="text-gray-500 max-w-md">
          To engage with our content, leave comments, and follow your favorite
          writers, consider joining us by creating an account.
        </p>
      </div>
    );
  }
 
  return (
    <div className="py-8 w-full">
        <Container>
            <div className="flex flex-wrap">
                            {
                                posts.map((post)=>(
                                    <div key={post.$id} className="p-2 w-1/4">
                                        <PostCard {...post}/>
                                    </div>
                                ))
                            }
                        </div>
        </Container>
    </div>
  );
}
