"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { SearchIcon } from "@heroicons/react/outline";
import { Text, TextInput, Button } from "@tremor/react";
import ErrorWarning from "./ErrorWarning";

interface Values {
  url: string;
}

export default function UrlInput() {
  const handleSubmit = (values: Values) => {
    fetch(`http://localhost:8000/run-script?url=${values.url}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error: any) => console.error("Fetch error:", error));
  };

  const validationSchema = Yup.object().shape({
    url: Yup.string().url("Invalid URL format").required("URL is required"),
  });

  interface Values {
    url: string;
  }

  return (
    <div className="space-y-4">
      <Formik
        initialValues={{ url: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="flex-col space-y-2">
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
