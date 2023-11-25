"use client";

import {
  Card,
  Text,
  Subtitle,
  Divider,
  Button,
  TextInput,
} from "@tremor/react";

import UrlInput from "../components/UrlInput";

export default function Home() {
  return (
    <main className="">
      <Card>
        <Text className="text-6xl text-center mb-10">Page Analysis</Text>
        <Subtitle className="text-xl text-center">
          Presented by Tomas Seliokas and Viktorija Seliokaite
        </Subtitle>
      </Card>
      <Card>
        <UrlInput />
      </Card>
    </main>
  );
}
