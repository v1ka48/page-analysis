"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { SearchIcon } from "@heroicons/react/outline";
import { Text, TextInput, Button } from "@tremor/react";
import { on } from "events";

export default function UrlInput({ onDataFetch }: any) {
  const handleSubmit = async (values: Values) => {
    onDataFetch("");
    try {
      const checkPasscode = await fetch(
        `/api/checkPasscode/route?passcode=${values.passcode}`
      );
      const passcode = await checkPasscode.json();
      if (!passcode.valid) {
        alert("Invalid or used passcode");
        return;
      }
      const response = await fetch(
        `/api/getPageAnalysis/route?url=${encodeURIComponent(values.url)}`
      );
      const data = await response.json();
      onDataFetch({ data });
    } catch (error) {
      console.log(error);
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
    <div className="space-y-4 p-4">
    <Formik
      initialValues={{ url: "", passcode: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="flex flex-col items-center">
          <Field
            as={TextInput}
            type="number"
            name="passcode"
            placeholder="Enter passcode"
            className="w-full p-2 border-2 border-[#7CE58D] mb-4"
          />
          <ErrorMessage name="passcode" component="div" />
          
          <Field
            as={TextInput}
            type="url"
            name="url"
            placeholder="Website address"
            className="w-full p-2 border-2 border-[#7CE58D] mb-4"
          />
          <ErrorMessage name="url" component="div" />

          <Button type="submit" className="bg-[#1C7EFC] text-white py-2 px-4">
            Get your score
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);
}
