import "./App.css";
import FormikForm from "./components/FormikForm";
import FormikFormComponent from "./components/FormikFormComponent";
import FormikFormFinal from "./components/FormikFormFinal";
import FormikYupValidations from "./components/FormikYupValidation";

function App() {
  return (
    <div className="App">
      <FormikForm />
      <FormikYupValidations/>
      <FormikFormComponent/>
      <FormikFormFinal/>
    </div>
  );
}

export default App;
