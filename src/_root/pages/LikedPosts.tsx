import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import { Link, useLocation, useParams } from "react-router-dom";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { id } = useParams();




  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="flex flex-col items-center w-full p-20">
      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      {currentUser.liked.length === 0 && (
        <p className="text-slate-400 mt-40">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
      </div>
    </>
  );
};

export default LikedPosts;
