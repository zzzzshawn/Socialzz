import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar ">
      <div className="flex flex-col gap-11 items-center lg:pr-10">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            width={200}
            height={36}
            className="max-lg:hidden"
          />
          <img
            src="/assets/images/lg-logo.svg"
            alt="Logo"
            width={35}
            height={40}
            className="lg:hidden "
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 item-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full max-lg:w-[60px] max-lg:h-[60px]"
          />
          <div className="flex flex-col justify-center max-lg:hidden">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-1">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6 ">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={` group body-bold leftsidebar-link ${
                  isActive ? "text-black bg-white " : " text-light-1"
                }`}
              >
                <NavLink to={link.route} className="flex gap-2 item-center p-2">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert max-lg:w-[30px] max-lg:h-[30px] ${
                      isActive && "invert"
                    }`}
                  />
                  <p className="max-lg:hidden body-bold">{link.label}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="hover:bg-white group flex justify-start  "
        onClick={() => signOut()}
      >
        <img
          className="group-hover:invert p-2"
          src="/assets/icons/logout.svg"
          alt="logout"
        />
        <p
          className={`body-bold group-hover:text-black  text-light-1  max-lg:hidden`}
        >
          Logout
        </p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
