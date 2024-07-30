import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui/button";

const Topbar = () => {
  const { user, isAuthenticated } = useUserContext();

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            width={130}
            height={325}
          />
        </Link>

        {isAuthenticated ? (
          <div className="flex mr-3">
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
              <img
                src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
                alt="profile"
                className="h-12 w-12 rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div className="flex-center">
            <Link to="/sign-up">
              <Button className="rounded-full p-5">
                <img
                  src="/assets/icons/sign-up.svg"
                  alt="signup"
                  className="h-6"
                />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Topbar;
