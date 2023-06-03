import './App.css';
import { useState, useEffect } from 'react';
import * as yup from 'yup'
import axios from 'axios';
import Form from './Form';


function App() {

  ////////////////////////// INITIAL VALUES //////////////////////////
  const initialFormValues = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    terms: false
  }

  const initialFormErrors = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    terms: ""
  }
  const initialUsers = []
  const initialDisabled = true

  ////////////////////////// STATE VARIABLES //////////////////////////
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  ////////////////////////// FORM SCHEMA //////////////////////////
  const schema = yup.object().shape({
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
      .boolean(true, "You Must Accept the Terms of Service to Continue")
  })

  ////////////////////////// HELPER FUNCTIONS //////////////////////////
  const postUsers = () => {
    axios.post("https://reqres.in/api/users")
        .then((res) => {
          console.log(res)
          setUsers([res.data, ...users])
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => setFormValues(initialFormValues))
  }
   
  ////////////////////////// EVENT HANDLERS //////////////////////////
  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const onChange = (name, value) => {
    validate(name, value)
    setFormValues({ ...formValues, [name]: value })
  }

  const onSubmit = () => {
    const newUser = {
      fName: formValues.fName.trim(),
      lName: formValues.lName.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms
    }

    postUsers(newUser)
  }

  return (
    <div className="App">
      <Form 
        values={formValues}
        users={users}
        update={onChange}
        submit={onSubmit}
        errors={formErrors}
        disabled={disabled}
      />
    </div>
  );
}

export default App;
