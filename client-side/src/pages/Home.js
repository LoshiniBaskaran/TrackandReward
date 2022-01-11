import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home() {

    let navigate = useNavigate();

    /* const [employeesList, setEmployeesList] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3001/employees").then((response) => {
        setEmployeesList(response.data);
      });
    }, []); */
  
    const [initiativesList, setInitiativesList] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3001/initiatives").then((response) => {
        setInitiativesList(response.data);
      });
    }, []);

    return (
        <div className='flexcontainer'>
            <div key="fc1" className='flexchild'>
                <h3 key="onAndCurr">Initiatives (Ongoing and Completed)</h3>
                {
                    initiativesList.map((value, key) => { 
                        if(value.initStatus !== "Yet to be Initiated") {
                            return (
                                <div className="list-item initiative" key={value.initId} onClick={() => {navigate(`/initiatives/${value.initId}`);}}> 
                                    <span className="initName"> {value.initName} || </span>
                                    <span className="initId">Id {value.initId} </span>
                                    {value.initStatus === "Completed" && <span className="status"> || {value.initStatus} </span>}
                                </div>
                            );
                        } else {
                            return(<div key={value.initId+"null"}></div>);
                        }
                    })
                }
            </div>
            <div key="fc2" className='flexchild'>
                <h3 key="Yet">Initiatives (Yet to be anounced)</h3>
                {
                    initiativesList.map((value, key) => { 
                        if(value.initStatus === "Yet to be Initiated") {
                            return (
                                <div className="list-item initiative" key={value.initId} onClick={() => {navigate(`/initiatives/${value.initId}`);}}> 
                                    <span className="initName"> {value.initName} || </span>
                                    <span className="initId">Id {value.initId} </span>
                                </div>
                            );
                        } else {
                            return(<div key={value.initId+"null"}></div>);
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Home
