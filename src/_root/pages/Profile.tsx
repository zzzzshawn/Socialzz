import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useSignOutAccount,
} from "@/lib/react-query/queriesAndMutation";
import Loader from "@/components/shared/Loader";
import GridPostList from "@/components/shared/GridPostList";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-white">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  const postId: string = id!; // Assert that id is a non-nullable string
  const { data: currentUser } = useGetUserById(postId);


  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-slate-400 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex flex-col gap-8 mt-10 items-start max-xl:items-center justify-center p-2 xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className={`flex justify-center gap-4 ${
                user.id !== currentUser.$id && "hidden"
              }`}>
            <div
              className={` flex-center flex-col`}
            >
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 hover:bg-dark-4 bg-white group  flex-center gap-2 rounded-lg w-32`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                  className=" invert group-hover:invert-0 "
                />
                <p className="font-semibold whitespace-nowrap group-hover:text-white text-black ">
                  Edit Profile
                </p>
              </Link>
              <Button
                variant="ghost"
                className="hover:bg-dark-4 group w-24 mt-4 md:hidden"
                onClick={() => signOut()}
              >
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className=" ml-2 font-semibold">Logout</p>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl justify-center w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-4"
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
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-4"
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

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
