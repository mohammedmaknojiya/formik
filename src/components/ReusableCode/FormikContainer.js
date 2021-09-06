import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const initialValues = {
    email:'',
    address:'',
    option: ''
};
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Id").required("Required"),
    address: Yup.string().required("Required"),
    option: Yup.string().required('Required')
});
const onSubmit = (v) => {
  console.log(v);
};

const dropDownOptions = [
    {key: "Select an Option", value:""},
    {key: "Option 1 ", value:"option1"},
    {key: "Option 2 ", value:"option2"},
    {key: "Option 3 ", value:"option3"}
]

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
            <FormikContainer
            control="select"
            label="Select an option"
            name="option"
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
