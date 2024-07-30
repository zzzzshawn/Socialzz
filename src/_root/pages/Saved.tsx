import { Models } from "appwrite";

import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import Oops from "@/components/shared/Oops";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { isAuthenticated } = useUserContext();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <>
      {isAuthenticated ? (
        <div className="saved-container">
          <div className="flex gap-2 w-full max-w-5xl">
            <img
              src="/assets/icons/save.svg"
              width={36}
              height={36}
              alt="edit"
              className="invert-white"
            />
            <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
          </div>

          {!currentUser ? (
            <Loader />
          ) : (
            <ul className="w-full flex justify-center max-w-5xl gap-9">
              {savePosts.length === 0 ? (
                <p className="text-slate-400">No available posts</p>
              ) : (
                <GridPostList posts={savePosts} showStats={false} />
              )}
            </ul>
          )}
        </div>
      ) : (
        <Oops/>
      )}
    </>
  );
};

export default Saved;
