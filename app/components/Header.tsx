import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="w-2/3 flex flex-col items-center justify-center">
      <Image src="/pageOpti.png" alt="PageOpti Logo" width={250} height={250} />
      <h1 className="text-6xl text-center mb-5">Make Every Visit Count</h1>
      <h2 className="text-xl text-center mb-8">
        Boost conversions and user engagement with PageOpti's real-time landing
        page analytics.
      </h2>
    </div>
  );
}
