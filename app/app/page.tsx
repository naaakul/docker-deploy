import React from "react";

const page = () => {
  return (
    <a href="https://nakul.space">
      <div className="bg-[#0a0a0a] flex justify-center items-center h-screen w-full flex-col">
        <p className="text-5xl text-neutral-400 font-mono ">
          THIS IS THE APP OF{" "}
          <span className="text-neutral-200">
             NAKUL CHOUKSEY
          </span>
        </p>
        <p className="text-neutral-400 font-mono">click to see the magic</p>
      </div>
    </a>
  );
};

export default page;
