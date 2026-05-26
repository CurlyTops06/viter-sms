import React from "react";
import { FaCogs } from "react-icons/fa";

const PageOngoingDevelopment = () => {
  return (
    <>
      <div className="flex items-center gap-5 flex-col w-full">
        <FaCogs className="size-50 text-primary" />
        <h2 className="text-xl">Ongoing Development</h2>
      </div>
    </>
  );
};

export default PageOngoingDevelopment;
