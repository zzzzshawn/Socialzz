import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import { timeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import Loader from "./Loader";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const [loading, setLoading] = useState(true); // State for managing image loading
  const dateString: string = post.$createdAt;
  const timestamp: string = timeAgo(dateString);

  const { user } = useUserContext();
  if (!post.creator) return null;

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when the image is loaded
  };

  const handleImageError = () => {
    setLoading(false); // Stop loading spinner if there's an error
  };

  return (
    <div className="post-card">
      <div className="flex-between mb-5">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center gap-2 text-slate-500">
              <p className="subtle-semibold lg:small-regular">{timestamp}</p>-
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" 
          alt="edit" 
          width={18} 
          height={18} />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="relative min-h-[300px]">
          {loading && (
            <div className="absolute size-full inset-0 flex justify-center items-center">
              <Loader/>
            </div>
          )}
          <img
            src={post.imageUrl || "assets/icons/profile-placeholder.svg"}
            alt="post image"
            className={`border-y border-dark-4 p-5 min-w-[235px] sm:w-[750px] md:w-[1000px] lg:w-[1220px] xl:[1500px] ${
              loading ? "opacity-0" : "opacity-100"
            }`} // Hide image while loading
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>

        <div className="small-medium lg:base-medium py-5 ">
          <p>
            <span className="body-bold">{post.creator.username}</span> :{" "}
            <span className="font-extralight">{post.caption}</span>
          </p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-4">
                {tag ? `#${tag}` : ""}
              </li>
            ))}
          </ul>
        </div>
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
