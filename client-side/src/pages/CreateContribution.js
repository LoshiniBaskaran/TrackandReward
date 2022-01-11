import React, { useState, useContext } from 'react';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";


function CreateContribution() {

    const navigate = useNavigate();
    const location = useLocation();

    const [conDesc, setConDesc] = useState("");
    const { authState } = useContext(AuthContext);

    const reset = () => {
        setConDesc("");
    }

    const contribute = async () => {
        if(conDesc !== "") {
            const data = {contributedBy: authState.empId, contributedFor: location.state.initiativeId, contributionDesc: conDesc};
            await axios.post("http://localhost:3001/contributions", data, {
                headers : {
                    accessToken : localStorage.getItem("accessToken")
                }
            }).then((response) => {
                if(!response.data.error) {
                    alert("Contribution logged");
                    navigate(`/initiatives/${location.state.initiativeId}`);
                }
                else {
                    window.alert(response.data);
                    console.log(response.data);
                }
            })
        } else {
            window.alert("Contribution cannot be empty");
        }
    }

    return (
        <div className='card' style={{height:"300px", marginTop:"50px", marginBottom:"50px"}}>
            <div className='card-header'>
                Log a contribution
            </div>
            <div className='card-content'>
                <div>
                For : {location.state.initiativeName}
                &nbsp;(Id : {location.state.initiativeId})<br/><br/>
                </div>
                <textarea value={conDesc} onChange={(event) => {setConDesc(event.target.value)}}></textarea><br/>
                <button onClick={reset} style={{display:"inline-block", margin:"5px"}}>RESET</button> 
                <button onClick={contribute} style={{display:"inline-block", margin:"5px"}}>CONTRIBUTE</button>
            </div>
        </div>
    )
}

export default CreateContribution
