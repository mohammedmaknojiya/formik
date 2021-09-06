import React from "react";
import { Field, ErrorMessage } from "formik";

const TextArea = (props) => {
  const { label, name, ...rest } = props;

  return (
    <div>
      <label>{label}</label>
      <Field as="textarea" name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
};

export default TextArea;
