import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const { store } = React.useContext(StoreContext);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
    // if (window.history.state && window.history.state.idx > 0) {
    //   navigate(-1);
    // } else {
    //   navigate("/", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    // }
  };

  return (
    <>
      <div className="flex items-center pt-40 flex-col gap-2 p-4 h-screen bg-gradient-to-t text-black">
        <h3 className="text-8xl">404</h3>
        <h2 className="font-bold text-2xl ">Page not found</h2>
        <p className="">Plase check your URL</p>
        <button
          type="button"
          className="group flex items-center gap-1 z-10 py-2 px-6 rounded-md text-primary font-bold"
          onClick={() => handleBack()}
        >
          <FaLongArrowAltLeft className="group-hover:mr-4 duration-100 ease-in-out" />
          <span>Go back</span>
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
