import "./App.css";
import FormikForm from "./components/FormikForm";
import FormikFormComponent from "./components/FormikFormComponent";
import FormikFormFinal from "./components/FormikFormFinal";
import FormikYupValidations from "./components/FormikYupValidation";
import FormikContainer from "./components/ReusableCode/FormikContainer";

function App() {
  return (
    <div className="App">
      <FormikForm />
      <FormikYupValidations/>
      <FormikFormComponent/>
      <FormikFormFinal/>
      <FormikContainer/>
    </div>
  );
}

export default App;
