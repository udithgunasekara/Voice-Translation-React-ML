import React from "react";

export default function Header() {
  return (
    <header className=" p-4 flex items-center justify-between gap-4 ">
      <a href="/">
        <h1 className="font-medium text-2xl">
          <span>
            {/* {" "} */}
            Free <span className=" text-blue-400 bold ">Scribe</span>
          </span>
        </h1>
      </a>

      <a
        href="/"
        className=" flex items-center gap-2 specialBtn px-4 py-2 rounded-lg
    text-blue-400 ">
        <p>New</p>

        <i className="fa-solid fa-plus"></i>
      </a>
    </header>
  );
}
