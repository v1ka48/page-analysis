import React from "react";

import { SearchIcon } from "@heroicons/react/outline";

function LoadingScreen() {
  return (
    <div
      className="bg-gradient-to-br from-[#394F68]
    justify-center
    • text-slate-500"
    >
      <SearchIcon
        className="h-24 w-24 animate-bounce mx-auto mt-10"
        color="blue"
      />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading Page Analysis
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        Hold on, we are crunching the numbers & generating an AI summary of
        inspection results!
      </h2>
    </div>
  );
}

export default LoadingScreen;
