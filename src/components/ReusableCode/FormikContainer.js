import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const initialValues = {
    email:'',
    address:'',
    selectOption: ''
};
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Id").required("Required"),
    address: Yup.string().required("Required"),
    selectOption: Yup.string().required('Required')
});
const onSubmit = (v) => {
  console.log(v);
};


const FormikContainer = () => {
  const dropDownOptions = [
    {key: "Select an Option", value:""},
    {key: "Option 1 ", value:"option1"},
    {key: "Option 2 ", value:"option2"},
    {key: "Option 3 ", value:"option3"}
]

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

            <FormikControl
                control='input'
                label='Email'
                name='email'
                type='email'
            />
            <FormikControl
            control="textarea"
            label="Address"
            name="address"
            />
            <FormikControl
            control="select"
            label="Select an option"
            name="selectOption"
            options={dropDownOptions}
            />


            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikContainer;
