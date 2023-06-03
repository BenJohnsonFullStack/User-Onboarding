import './App.css';
import { useState, useEffect } from 'react';
import * as yup from 'yup'
import Form from './Form';


function App() {
  const initialFormValues = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    terms: false
  }

  const [users, setUSers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  const schema = yup.object({
    fName: yup
      .string()
      .required("First Name is Required")
      .min(2, "First Name Must Contain 2 or More Characters")
      .max(30, "First Name Must Be 30 Characters or Less"),
    lName: yup
      .string()
      .required("Last Name is Required")
      .min(2, "Last Name Must Contain 2 or More Characters")
      .max(30, "Last Name Must Be 30 Characters or Less"),
    email: yup
      .string()
      .required("Email is Required"),
    password: yup
      .string()
      .required("Please Enter Your Password"),
    terms: yup
      .boolean()
  })

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
