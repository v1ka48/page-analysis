import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Text, Divider, TextInput, Button } from "@tremor/react";

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
    <div>
      <Formik
        initialValues={{ url: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Text>Enter URL</Text>
            <Field
              as={TextInput}
              type="url"
              name="url"
              placeholder="https://www.google.com/?client=safari"
            />
            <ErrorMessage name="url" component="div" />
            <Button type="submit" size="xl">
              Analyze
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
