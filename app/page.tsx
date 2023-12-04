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
    <main>
      <Card>
        <Text className="text-6xl text-center mb-10">Page Analysis</Text>
        <Subtitle className="text-xl text-center">
          Presented by Tomas Seliokas and Viktorija Seliokaite
        </Subtitle>
      </Card>
      <Callout title="What is this?">
        This is a web application that analyzes a given web page and returns the
        results of the analysis.
      </Callout>
      <Card>
        <UrlInput onDataFetch={handleData} />
      </Card>
      {analysis && <UrlOutput analysis={analysis} />}
    </main>
  );
}
