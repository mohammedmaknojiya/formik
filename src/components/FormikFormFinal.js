import React from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: ""
};
const onSubmit = (v) => {
  console.log(v);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email Id").required("Required"),
  channel: Yup.string().required("Required"),
  comments: Yup.string().required("Required")
});

const FormikFormFinal = () => {
  return (
    <>
      <h1>Formik Form Final</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <label>Name</label>
          
          <Field type="text" name="name"/>
          <ErrorMessage name="name"/>
          <br />

          <label>Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email"/>
          <br />

          <label>Channel Name</label>
          <Field type="text" name="channel" />
          <ErrorMessage name="channel"/>
          <br />

        <label>Comments</label>
          <Field as="textarea"  name="comments" />
          <ErrorMessage name="comments"/>
          <br />

          <button type="submit">submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default FormikFormFinal;
