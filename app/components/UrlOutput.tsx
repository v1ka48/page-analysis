import { Callout } from "@tremor/react";
import React from "react";

function UrlOutput({ analysis }: any) {
  console.log(analysis);
  return (
    <Callout className="mt-5" color="slate" title="Analysis Results">
      {analysis.result?.split("\n").map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Callout>
  );
}

export default UrlOutput;
