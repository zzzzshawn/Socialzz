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
      <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
    </>
  );
};

export default LikedPosts;
