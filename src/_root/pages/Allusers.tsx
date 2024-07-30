import Loader from "@/components/shared/Loader";
import Oops from "@/components/shared/Oops";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetUsers } from "@/lib/react-query/queriesAndMutation";

const AllUsers = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useUserContext();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="common-container">
          <div className="user-container">
            <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
            {isLoading && !creators ? (
              <Loader />
            ) : (
              <ul className="user-grid">
                {creators?.documents.map((creator) => (
                  <li
                    key={creator?.$id}
                    className="flex-1 min-w-[200px] w-full  "
                  >
                    <UserCard user={creator} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <Oops />
      )}
    </>
  );
};

export default AllUsers;
