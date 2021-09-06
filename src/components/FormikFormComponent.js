import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray} from "formik";
import * as Yup from "yup";
import ErrorComponent from "./ErrorComponent";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  extra: "",
  extra1: "",
  social: {facebook:"",instagram:""},
  phoneNumbers : ['',''],
  phNumbers : ['']

};
const onSubmit = (v) => {
  console.log(v);
};

//we define validation schema using Yup instead of validate function
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email Id").required("Required"),
  channel: Yup.string().required("Required"),
  comments: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  extra: Yup.string().required("Required"),
  extra1: Yup.string().required("Required"),
  social: Yup.object({
    facebook: Yup.string().required("Required"),
    instagram: Yup.string().required("Required")
  }),
  phoneNumbers: Yup.array().of(Yup.string().required("Requuired")),
  phNumbers: Yup.array().of(Yup.string().required("Required"))
});

const FormikFormComponent = () => {
  //here wrap our form component inside Formik component
  //it acts as a provider to our form. It provides initialValues, onSubmit, validationSchema to our form directly
  //because of this we can avoid using useFormik hook
  //   const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <>
      <h1>Formik Form Components</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
       {/* {now we replace our form component with formik's Form Component. By using this we can avoid 
       using onSubmit={formik.handleSubmit} 
       our Form component wrap our previous actual form tag and provide onsubmit feature
       basically it acts as an abstraction} */}
        <Form>
          <label>Name</label>
          {/* {now in input we have repeated 3 lines which are for value onchange and onBlur in all the 
        input fields. Now to avoid that in formik we have one method formik.getFieldProps method 
        it returns this 3 things. So by using spread operator we spread it. It just takes one arugment 
        which is name attribute value like name="email" then it takes email string as input} 
        it helps to reduce redundant 3 lines */}
        {/* {now we see that our input tag have formik.getFieldProps("name") in all inputs
        now to get rid of this we use Field component of formik. It does 2 things
        Make a input tag, actomatically hooks formik.getFieldProps("name") into input tag with name attribute  } */}
          <Field type="text" name="name"/>
        {/* {we can see that for printing error we checked that it is empty or not and it is visited or not
        this thing is redundant for every fields. for that formik provides us ErrorMessage component
        which do this things for us. we just have to pass exact name attribute same as input field} */}
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

        {/* {now Field component automatically renders input element inside it. now what if we want to
        render textarea. for that we have one attribute inside Field component which is [as].
        the default value of as=input always. to render different things specify respected values} */}

        <label>Comments</label>
          <Field as="textarea"  name="comments" />
          <ErrorMessage name="comments"/>
          <br />
        {/* {now we will see how we can render input element using render props pattern
        this pattern is useful when you want to define your own input type of element
        here inside we get access to all props which Field component have 
        our internal function will return some JSX which define our input element } */}
        <label>Address</label>
        <Field name="address">
          {
            (props) =>{
              //console.log("Field props",props)
              {/* {here in props we get access to 3 things 1)field 2)form 3)meta } 
              field gives us access to onBlur onChange name and value which we used to define at input element
              meta gives us access to touched and error values object which we used to render error condtionally
              and form also gives us access to other usefull methods. Now we destructure it here to use it */}
              const {field,form,meta} = props
              return(
                <div>
                {/* {now to provide properties like onBlur onChange value and name we destructure field here} */}
                  <input type="text"  {...field}/>
                  {/**now to checked field is touch and error is present in error obj and then render error
                  we use below code this 2 properties are available in meta */}
                  {meta.touched && meta.error? <div>{meta.error}</div> : null}
                </div>
              )
            }
          }
        </Field>
        {/* {now here we see how we can pass custom error component with our styling} */}
        <label>Extra Details</label>
          <Field as="textarea"  name="extra" />
          <ErrorMessage name="extra" component={ErrorComponent}/>
          <br />
          {/* {we can also use render props pattern to specify error 
          here iniside our function we get error message as a props and then we can render some JSX} */}
          <label>Extra Details More</label>
          <Field as="textarea"  name="extra1" />
          <ErrorMessage name="extra1" >
            { //name of props can be anything
              (erroMessageProps)=> {
                return <div>{erroMessageProps}</div>
              }
            }
          </ErrorMessage>
          <br />


          {/**now we see how we can use nested object  */}
          
          <label>Facebook profile</label>
          <Field type='text' name='social.facebook' />
          <ErrorMessage name="social.facebook"/>
          <br/>
            
          <label>Instagram profile</label>
          <Field type='text' name='social.instagram' />
          <ErrorMessage name="social.instagram"/>
          <br/>

            
          <label>Phone Number Primary</label>
          <Field type="number" name="phoneNumbers[0]"/>
          <ErrorMessage name="phoneNumbers[0]"/>

          <label>Secondry Number Primary</label>
          <Field type="number" name="phoneNumbers[1]"/>
          <ErrorMessage name="phoneNumbers[1]"/>

          <label>List Of phone Numbers</label>
          <FieldArray name='phNumbers'>
            {
              fieldArrayProps => {
                console.log(fieldArrayProps)
                const {push, remove, form} = fieldArrayProps;
                const {values} = form;
                const {phNumbers} = values
                return(
                  <div>
                   {
                     phNumbers.map( (pnumber , index)=>(
                       <div key={index}>
                       {/**this ${} is used to evaluate and put the value inside string in JS */}
                          <Field name={`phNumbers[${index}]`}/> {/**this become phNumbers[0] then 1 and so on */}
                          {/**we have to restrict the user from removing all the fields. minimum 1 field must
                          be present. hence we check if index is greate then zero then only we display the 
                          remove button else we will remove that */}
                          { index>0 && <button type="button" onClick={ ()=> remove(index)}> - </button>}
                          <button type="button" onClick={ ()=> push('')}> + </button>
                          <ErrorMessage name={`phNumbers[${index}]`}/>
                       </div>
                     ) )
                   }
                  </div>
                )

              }
            }
          </FieldArray>

          <button type="submit">submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default FormikFormComponent;
