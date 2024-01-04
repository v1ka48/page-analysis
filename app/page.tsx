"use client";

import React, { useState } from "react";

import "./styles/global.scss";
import UrlOutput from "./components/UrlOutput";
import UrlInput from "./components/UrlInput";
import Header from "./components/Header";

interface FetchedData {
  data: any; // Replace 'any' with the type of 'data'
}

export default function Home() {
  const [analysis, setAnalysis] = useState("");

  const handleData = (fetchedData: FetchedData) => {
    console.log(fetchedData);
    setAnalysis(fetchedData.data);
  };

  return (
    <main>
      <div className="flex justify-between mt-40">
        <UrlInput onDataFetch={handleData} />
        <Header />
      </div>
      {analysis && <UrlOutput analysis={analysis} />}
    </main>
  );
}
