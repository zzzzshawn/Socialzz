import { useUserContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Oops = () => {
  const { isAuthenticated } = useUserContext();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({ title: "Please Sign-In to access this page" });
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center p-5 w-full h-[80%] max-sm:mt-20">
      <h2 className="font-semibold text-2xl text-center max-sm:text-lg">
        You haven't signed in, have you?{" "}
      </h2>
      <img src="/assets/images/base.png" alt="" className="max-h-[350px]" />
      <Link to="/sign-in">
        <Button className="hover:bg-white hover:text-black font-bold border border-zinc-800 group flex gap-2  p-6">
          <img src="/assets/icons/sign-up.svg" className="group-hover:invert h-5 w-5" alt="signin" />
          <p>Sign-in</p>
        </Button>
      </Link>
    </div>
  );
};

export default Oops;
