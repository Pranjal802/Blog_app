import React from "react";
import appwriteService from '../appwrite/config'
import { Link } from "react-router-dom";

 function PostCard({$id,title,img}){
    return(
       <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className="w-full justify-center mb-4">
                <img src={appwriteService.getFilePreview(img)} alt={title} className="rounded-xl"/>
            </div>
            <h2
            className="text-xl text-white"
            >{title}</h2>
        </div>
       </Link>
    )
}

export default PostCard