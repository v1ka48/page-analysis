"use client";

import React, { useState } from "react";
import {
  Card,
  Text,
  Subtitle,
  Divider,
  Button,
  TextInput,
  Callout,
} from "@tremor/react";

import UrlOutput from "./components/UrlOutput";
import UrlInput from "./components/UrlInput";

export default function Home() {
  const [analysis, setAnalysis] = useState("");

  const handleData = (fetchedData) => {
    setAnalysis(fetchedData.data);
  };

  return (
    <div>
      <header className="text-white bg-[#00193B] p-4 text-center">
        <div className="logo"> {/* Place your logo here */} </div>
      </header>
      <div className="hero bg-[#56CCF2] text-center p-5 text-[#333]">
        <h1 className="text-3xl font-bold">Make Every Visit Count</h1>
        <p className="mt-3">Boost conversions and user engagement with PageOpti's real-time landing page analytics</p>
      </div>
      <div id="website-grader-form" className="mt-5 p-4">
        <UrlInput onDataFetch={handleData} />
      </div>
      <div className="grading-section my-5">
        {/* Include grading section content here */}
      </div>
      {analysis && <UrlOutput analysis={analysis} />}
      <footer className="bg-[#00193B] text-white p-4 text-center">
        {/* Footer content */}
      </footer>
    </div>
  );
}
