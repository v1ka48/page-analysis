"use client";

import {
  Card,
  Text,
  Subtitle,
  Divider,
  Button,
  TextInput,
  Callout,
} from "@tremor/react";

import UrlInput from "../components/UrlInput";

export default function Home() {
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
        <UrlInput />
      </Card>
      <div className="mb-5">
        <Callout className="h-24 mt-5" color="slate" title="Analysis Results">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          tempor lorem non est congue blandit. Praesent non lorem sodales,
          suscipit est sed, hendrerit dolor.
        </Callout>
      </div>
    </main>
  );
}
