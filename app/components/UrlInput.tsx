"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { SearchIcon } from "@heroicons/react/outline";
import { Text, TextInput, Button } from "@tremor/react";
import { on } from "events";

export default function UrlInput({ onDataFetch }: any) {
  let passcodes = [243792, 543025, 123456, 654321, 987654, 123789, 199042];
  const handleSubmit = async (values: Values) => {
    if (passcodes.includes(Number(values.passcode))) {
      try {
        const response = await fetch(
          `/api/getPageAnalysis/route?url=${encodeURIComponent(values.url)}`
        );
        const data = await response.json();
        onDataFetch({ data });
      } catch (error) {
        console.log(error);
      }
      if (Number(values.passcode) !== 199042)
        passcodes = passcodes.filter((item) => item !== values.passcode);
    } else {
      alert("Invalid passcode");
    }
  };

  const validationSchema = Yup.object().shape({
    url: Yup.string().url("Invalid URL format").required("URL is required"),
    passcode: Yup.number()
      .nullable("Invalid OTP format")
      .required("Passcode is required"),
  });

  interface Values {
    url: string;
    passcode: number;
  }

  return (
    <div className="space-y-4">
      <Formik
        initialValues={{ url: "", passcode: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex-col space-y-2">
              <Text>One Time Passcode</Text>
              <Field
                as={TextInput}
                type="passcode"
                name="passcode"
                placeholder="123456"
              />
              <Text>Enter URL</Text>
              <Field
                as={TextInput}
                type="url"
                name="url"
                placeholder="https://www.google.com/?client=safari"
              />
              <Button icon={SearchIcon} type="submit" variant="primary">
                Analyze
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
