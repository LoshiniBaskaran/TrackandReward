import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'
import Home from "./pages/Home";
import CreateInitiative from './pages/CreateInitiative';
import Initiative from './pages/Initiative';
import Contribution from './pages/Contribution';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateContribution from './pages/CreateContribution';
import PageNotFound from './pages/PageNotFound'
import { AuthContext } from "./helpers/AuthContext";

function App() {

  const [authState, setAuthState] = useState({empId:0, empName:"", email:"", designation:"", status: false});

  useEffect(() => {
    axios.get("http://localhost:3001/employees/validate/tokenauth", {
      headers : {
        accessToken : localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if( response.data.error ) {
        setAuthState({empId:0, empName:"", email:"", designation:"", status: false});
      } else {
        setAuthState({
          empId:response.data.empId,
          empName:response.data.empName,
          email:response.data.email,
          designation:response.data.designation,
          status: true
        });  
      }
    })
    /* if(localStorage.getItem("accessToken")) {
      setAuthState(true);
    }*/
  },[]);
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/> } />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/createinitiative" element={<CreateInitiative/> } />
            <Route path="/initiatives/:id" element={<Initiative/> } />
            <Route path="/contributions/:id" element={<Contribution/>} />
            <Route path="/createContribution" element={<CreateContribution/> } />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Footer/>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;