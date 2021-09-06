import React from "react";
import { Field, ErrorMessage } from "formik";

const Input = (props) => {
  const { label, name, ...rest } = props;
  //console.log("in input",rest);
  return (
    <div>
      <label>{label}</label>
      <Field name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
};

export default Input;
