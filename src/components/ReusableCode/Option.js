import React from "react";
import { Field, ErrorMessage } from "formik";

const Option = (props) => {
  const { label, name,options, ...rest } = props;

  return (
    <div>
      <label>{label}</label>
      <Field as="select" name={name} {...rest} >
      {
          options.map( (option)=>{
              return(
              <option key={option.value} value={option.value}>
                  {option.key}
              </option>)
          } )
      }
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default Option;