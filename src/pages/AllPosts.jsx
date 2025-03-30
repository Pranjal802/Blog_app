import React,{useState,useEffect} from "react";
import {Container, PostCard} from "../Components/index"
import appwriteService from "../appwrite/config"

export default function AllPosts(){

    const [posts, setPosts] = useState([])

    useEffect(()=>{

    },[])

    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })

    return (
        <div className="py-8 w-full">
           <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post}/>
                        </div>
                    ))
                }
            </div>
           </Container>
        </div>
    )
}