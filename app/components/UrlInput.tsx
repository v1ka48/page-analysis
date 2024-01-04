"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { SearchIcon } from "@heroicons/react/outline";

import Input from "./atoms/Input";

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
    <div className="w-1/3 mt-28 ml-24 p-5">
      <Formik
        initialValues={{ url: "", passcode: 0 }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex flex-col space-y-6 items-center justify-center w-full">
              <Input
                className="w-full"
                label="OTP (One Time Passcode)"
                name="passcode"
                placeholder="123456"
                required={true}
              />
              <Input
                className="w-full"
                label="Page URL"
                id="url"
                placeholder="https://www.example.com"
                required={true}
              />
              <button
                className="bg-dark-green hover:bg-secondary-green text-white py-2 px-4 rounded items-center"
                type="submit"
              >
                <SearchIcon className="h-5 w-5 inline-block pr-1" />
                <span>Get your score</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
