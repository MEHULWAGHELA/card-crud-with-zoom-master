import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormComponent from './components/FormComponent';
import CardComponent from './components/CardComponent';
import { createContext, useEffect, useState } from 'react';
export let Cardcontext = createContext()
function App() {
  let [array, setarray] = useState(JSON.parse(localStorage.getItem("array")) || [])
  let [count, setcount] = useState(JSON.parse(localStorage.getItem("count")) || 0)
  let [obj, setobj] = useState({ title: '', subtitle: '', image: '', information: '', button: '' })
  let [editobj, seteditobj] = useState({})
  let [editid, seteditid] = useState()

  useEffect(() => {
    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("count", JSON.stringify(count));
  }, [array, count])


  useEffect(() => {
    setarray(JSON.parse(localStorage.getItem("array")))
    setcount(JSON.parse(localStorage.getItem("count")))
  }, [])
  return (
    <div>
      <Cardcontext.Provider value={{ array, count, obj, editobj, editid, setarray, setcount, setobj, seteditobj, seteditid }} >
        <FormComponent />
        <CardComponent />
      </Cardcontext.Provider>
    </div>
  );
}

export default App;
