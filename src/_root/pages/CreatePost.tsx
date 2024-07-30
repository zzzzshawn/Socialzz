import PostForm from "@/components/forms/PostForm";
import Oops from "@/components/shared/Oops";
import { useUserContext } from "@/context/AuthContext";

const CreatePost = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <div className="flex flex-1">
      {isAuthenticated ? (
        <div className="common-container">
          <div className="max-w-5xl flex-start gap-3 justify-start w-full">
            <img
              src="/assets/icons/add-post.svg"
              alt="add"
              width={36}
              height={36}
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
          </div>

          <PostForm action="Create" />
        </div>
      ) : (
        <Oops/>
      )
      }
    </div>
  );
};

export default CreatePost;
