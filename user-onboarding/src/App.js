import './App.css';
import Form from './Form';


function App() {
  const initialFormValues = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    terms: false
  }

  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
