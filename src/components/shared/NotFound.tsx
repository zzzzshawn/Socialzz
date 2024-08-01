const NotFound = () => {
  return (
    <div className="flex-center flex-col gap-16 w-full ">
        <h1 className="text-center text-7xl max-sm:text-3xl max-md:text-4xl font-bold text-zinc-300">
          404 | Page Not Found
        </h1>
      <div className="w-[50%] max-lg:w-[70%] xl:w-[30%] max-sm:w-[95%]">
        <img src="/assets/images/lost.png" alt="lost" />
        <p className="text-3xl font-bold mt-5 text-center">You lost Bro?</p>
      </div>
    </div>
  );
};

export default NotFound;
