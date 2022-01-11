import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Header() {

  const {authState, setAuthState} = useContext(AuthContext);
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({empId:0, empName:"", email:"", designation:"", status: false});
  }
  return (
    <nav className="header"> 
      <NavLink exact='true' className="navlink" to="/">
        Home
      </NavLink>
      { !authState.status ? (
        <>
          <NavLink className="navlink" to="/login">
            Login
          </NavLink> 
          <NavLink className="navlink" to="/register">
            Register
          </NavLink>
        </>
        ) : (
        <>
        { authState.empName === "admin" &&
          <NavLink className="navlink" to="/createinitiative">
            Create Initiative
          </NavLink> }
          <NavLink className="navlink logout" onClick={logout} to="/">Logout</NavLink>
          <span className="navlink" style={{float:"right", textDecoration:"underline"}}>Hello {authState.empName}!</span>
        </>
      )}
      <div className="title-card">TRACK-N-REWARD</div>
    </nav>
  );
}
export default Header;