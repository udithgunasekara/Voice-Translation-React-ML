import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between  h-16 w-full ">
      <a href="/" className="w-3/5 h-full angled-right ">
        <div className="h-full bg-white flex items-center justify-center">
          <h1 className="font-medium text-3xl">
            <span>
              VOX<span className="text-sky-600 text-4xl ">TEXT</span>
            </span>
          </h1>
        </div>
      </a>

      <div className="w-full h-full flex items-center justify-end mr-9 angled-left">
        <a
          href="https://github.com/udithgunasekara/Voice-Translation-React-ML/tree/main/voxtext"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center specialBtn text-sky-600 rounded-full transition-all duration-300 overflow-hidden h-10 w-10 hover:w-36 mr-4">
          <div className="w-10 flex justify-center items-center flex-shrink-0">
            <i className="fa-brands fa-github"></i>
          </div>
          <p className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            GitHub Repo
          </p>
        </a>
        <a
          href="/"
          className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-sky-600">
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </a>
      </div>
    </header>
  );
}
