import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {};
const validationSchema = Yup.object({});
const onSubmit = (v) => {
  console.log(v);
};

const FormikContainer = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <h1>Reusbale Formik Form Example</h1>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikContainer;
