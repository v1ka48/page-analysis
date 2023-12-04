import { Callout } from "@tremor/react";
import React from "react";

function UrlOutput({ analysis }: any) {
  return (
    <Callout className="mt-5" color="slate" title="Analysis Results">
      {analysis.data.split("\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </Callout>
  );
}

export default UrlOutput;
