import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Option from "./Option";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  //console.log("in controls",rest);

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Option {...rest}/>;
    case "radio":
    case "checkbox":
    case "date":
    default:
      return null;
  }
};

export default FormikControl;
