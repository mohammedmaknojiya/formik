import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: ""
};
const onSubmit = (v, onSubmitProps) => {
  console.log(v);
  onSubmitProps.setSubmitting(false);//to make our submit button re-enabled after getting success code from server
  onSubmitProps.resetForm(); // to reset form after getting success message from server
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email Id").required("Required"),
  channel: Yup.string().required("Required"),
  comments: Yup.string().required("Required"),
});

//instead of defining validationSchema and validation function in useFormik() way, we can also perform field
//level validation. for that we define one seprate function for that particular field same as we define validate
//function at the time of useFormik hook way
const validateAddress = (addrValue)=>{
    let error;
    if(!addrValue){
        error = "Required"
    }
    return error
}

const FormikFormFinal = () => {
  return (
    <>
      <h1>Formik Form Final</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount={true} //for making submit button disabled at initial render
      >
      {/* using formik in the form of render props pattern. We use this pattern to get access to field and 
      form level validation. By using this pattern we get access to methods like validateform and validatefield
      and many other. See part 26 for more details */}
        {(formik) => {
            console.log(formik)
            return (
          <Form>
            <label>Name</label>

            <Field type="text" name="name" />
            <ErrorMessage name="name" />
            <br />

            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />
            <br />

            <label>Channel Name</label>
            <Field type="text" name="channel" />
            <ErrorMessage name="channel" />
            <br />

            <label>Comments</label>
            <Field as="textarea" name="comments" />
            <ErrorMessage name="comments" />
            <br />

            <label>Address</label>
            <Field as="textarea" name="address" validate={validateAddress} />
            <ErrorMessage name="address" />
            <br />
            {/**to disable the submit button if the field values are not correctly entered we can use property
            isvalid. If it is false then button is disabled 
            but isValid is set to false when atleast one field in the errors object is set or present
            but at the time of initial rendering the errors object is empty because we have not interacted 
            with the form yet and hence because errors obj is empty isValid is true hence button is enabled
            automatically at initial run
            So to make button disabled at the time of initial run we must have atleast one value set in errors
            object. So to set values in initial object at the time of initial run we use one property of formik
            which is validateOnMount which validate all the fields at the time of first rendering
            hence in initial loading all the fields are empty intially hence errors object get poppulated and hence
            our isValid become false and hence not of isvalid becomes true and button get disabled
            this method have one drwaback that it is performance consuming if our fields have very high complex
            vaidation see video part 27 for more details*/}
            {/* {to disable the submit button when our form submission process is going on to avoid multiple
            submit click by user we use one property of formik props which is isSubmitting
            after submitting our databse has to reponse back with success code. and then we have to reenable
            our submit button. for that we have one additional props which get passed in our onSubmit method 
            of Formik component } */}
            <button type="submit" disabled={!formik.isValid  || formik.isSubmitting}>submit</button>
            {/* {to reset the form data onclick of button use}
            the another scenario is when after submitting form we get success message and then we reset form
            to put another values for that we can use one property in onSubmit method */}
            <button type="reset">Reset</button>
          </Form>)
        }}
      </Formik>
    </>
  );
};

export default FormikFormFinal;
