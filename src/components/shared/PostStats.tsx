import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutation";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite"
import React, { useEffect, useState } from "react";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;   
}
const PostStats = ({post, userId}: PostStatsProps) => {

  const likesList = post?.likes.map((user: Models.Document) => user.$id)

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false)

  const {mutate: likePost} = useLikePost();
  const {mutate: savePost} = useSavePost();
  const {mutate: deleteSavedPost} = useDeleteSavedPost();

  const {data: currentUser} = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id) // checks saved to see if user already saved post

  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false) 
    //  !!savedPostRecord is another way to write ternary operator
  }, [currentUser])
  

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId)

    if(hasLiked){
      newLikes = newLikes.filter((id) => id !== userId) // removes the like (filter gives array of all others who have liked except for the id)
    }
    else{
      newLikes.push(userId)
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likesArray: newLikes})
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();



    if(savedPostRecord){ //(if post is saved already) removes saved post 
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id)
    }
    else{
      savePost({postId: post?.$id || '', userId});
      setIsSaved(true);
    }

  }

  return (
    <div className="flex justify-between items-center z-20 mt-2">
        <div className="flex gap-2 mr-5">
            <img 
            src={`${checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"}`}
            alt="like" 
            width={20} 
            height={20}
            onClick={handleLikePost}
            className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>

        <div className="flex gap-2 ">
            <img 
            src={`${isSaved
              ? "/assets/icons/saved.svg"
              : "/assets/icons/save.svg"}`} 
            alt="save" 
            width={20} 
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
            />
        </div>
    </div>
  )
}

export default PostStats