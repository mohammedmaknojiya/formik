import React from "react";
import {useFormik} from "formik";

const FormikForm = () => {
  //to manage state and to handle onchange, to handle submit , to handle error
  //useFormik returns and object which helps in maintaining all above things
  //we make a reference of it 

  //for initializing state we have inbuilt property of formik object which is intialValue 
  //it takes and object and its keys MUST BE same as name attribute of each fields
  //we got access to these initial value by formik.values.nameofkey because initial values are stored in value object
  //First we take values from initialValues obj and assign it to values obj and that values are rendered 
  //handleChange method handles changes and updates values obj and values are rendered again after update

  //to handle submit on form formik provide one method handleSubmit we pass it in form tag
  //handleSubmit automatically get values object which we had set in initialValues -> values

  const formik = useFormik({
    initialValues:{
      name:'', //name must be value of name parameter in input field name="name" <- this string is our key
      email:'', // like name="email"
      channel:''
    },
    onSubmit: v =>{ //this v is our values obj
      //you can send data to backend on the submit of form. here we just log it
      console.log(v)
    },
    //for form validation we have one more property validate in useFormik hook.
    //It takes our values as an obj and check for validation rules 
    // there are some rule for defining validation function
    //1) the validation function must return one obj which is error obj
    //2) this object contains key val pairs in which each key name must be similar to values obj keys
    //3) the value to each key must be string 
    validate: val =>{ //this val name can be anything. it holds values obj
      let error = {} //empty obj. the name can be anything
      //now we define some rules 
      if(!val.name){
        error.name= "Required" //name is required //if key name is not found in obj then it creates one and assign val
      }
      if(!val.email){
        error.email="Required" //email is required //if key email is not found in obj then it creates one and assign val
      }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val.email)) {
           error.email = 'Invalid email format'
          } //for checking email format

      if(!val.channel){
        error.channel="Required" //email is required
      }
      return error; //this return is MUST
      //now this error obj is accesible by our formik because it holds reference of useFormik hook
      //we can access error msg obj by formik.errors
      //our useFormik hook assign our error obj to errors attribute [errors = error]
      //like we had assig values = intialValues
    }

  })
  //console.log(formik)
  //console.log(formik.errors)
  //Rather than showing errors directly for all input fields we show it for that field with which we are 
  //currently interacting. for that we have to keep track of visited field 
  //useFormik hook provides use with one value which is touched. it is the obj which keeps track of all visited 
  //fields. if the input is visited then it sets it name key as true or it is false
  //in the input fields to know whether we are currently interacting with the input we have one method which
  //is onBlur. we call formik method formik.hanldeBlur to check for interactivity. It returns our touched obj
  console.log(formik.touched)


  return (
    <>
      <h1>Formik Forms</h1>

      <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {/* check if you had previously interacted with the field if yes and not entered val then show error
        {render error msg in div if it exist otherwise render null} */}
        {formik.touched.name && formik.errors.name? <div>{formik.errors.name}</div>  : null}
        <br />

        <label>Email</label>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email? <div>{formik.errors.email}</div>  : null}
        <br />

        <label>Channel Name</label>
        <input type="text" name="channel" value={formik.values.channel} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.channel && formik.errors.channel? <div>{formik.errors.channel}</div>  : null}
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default FormikForm;
