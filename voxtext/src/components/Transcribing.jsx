import React from "react";

export default function Transcribing(props) {
  const { donwloading } = props;

  return (
    <div className="p-2 mt-12 bg-white bg-opacity-90 rounded-lg shadow-lg w-128 h-96 max-w-full mx-auto text-center items-center">
      <div className="flex items-center flex-col justify-center gap-10 md:gap-14 py-12 p-4 text-center">
        <div className="flex flex-col gap-2 sm:gap-4">
          <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
            <span className="text-blue-400 bold">Transcribing</span>
          </h1>
          <p>
            {!donwloading ? "warming up cyliners" : "core cylinders engaged"}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 max-w-[400px] mx-auto w-full">
          {[0, 1, 2].map((val) => {
            return (
              <div
                key={val}
                className={
                  "rounded-full h-2 sm:h-3 bg-slate-400 loading " +
                  ` loading${val} `
                }></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
