import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
};
const onSubmit = (v) => {
  console.log(v);
};

//we define validation schema using Yup instead of validate function 
const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email Id").required("Required"),
    channel: Yup.string().required("Required")
})


const FormikYupValidation = () => {
    //Note if in object key and value both are same the we can just write it once
    // like { email:email } is same as {email}
    //like  {initialValues:initialValues, onSubmit:onSubmit, validate:validate } is equal to { initialValues, onSubmit, validate }
  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <>
      <h1>Formik Forms Yup Validation</h1>

      <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        {/* {now in input we have repeated 3 lines which are for value onchange and onBlur in all the 
        input fields. Now to avoid that in formik we have one method formik.getFieldProps method 
        it returns this 3 things. So by using spread operator we spread it. It just takes one arugment 
        which is name attribute value like name="email" then it takes email string as input} 
        it helps to reduce redundant 3 lines */}
        <input
          type="text"
          name="name"
          {...formik.getFieldProps("name")} //it prints these 3 values because we are spreading here value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <br />

        <label>Email</label>
        <input
          type="email"
          name="email"
          {...formik.getFieldProps("email")} 
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <br />

        <label>Channel Name</label>
        <input
          type="text"
          name="channel"
          {...formik.getFieldProps("channel")} 
        />
        {formik.touched.channel && formik.errors.channel ? (
          <div>{formik.errors.channel}</div>
        ) : null}
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default FormikYupValidation;
