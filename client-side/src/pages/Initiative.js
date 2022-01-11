import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../helpers/AuthContext";


function Initiative() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [initiativeObject, setInitiativeObject] = useState({});
    const [subscriptionObject, setSubscriptionObject] = useState([]);
    const [contributionObject, setContributionObject] = useState([]);
 
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        let mounted = true;
        
        if(mounted) {
            axios.get(`http://localhost:3001/initiatives/${id}`).then((response) => {
                setInitiativeObject(response.data);
            });
        }

        return () => mounted = false;
    },[id]);

    useEffect(() => {
        let mounted = true;
        
        if(mounted) {
            axios.get(`http://localhost:3001/subscriptions/findbyinitiative/${id}`).then((response) => {
                        setSubscriptionObject(response.data);
           });
        }

        return () => mounted = false;
    },[id]);

    useEffect(() => {
        let mounted = true;
        
        if(mounted) {
            axios.get(`http://localhost:3001/contributions/findbyinitiative/${id}`).then((response) => {
                        setContributionObject(response.data);
           });
        }

        return () => mounted = false;
    },[id]);

    const logContribution = () => {
        navigate("/createContribution", {state:{initiativeId:initiativeObject.initId, initiativeName: initiativeObject.initName}});
    }

    const subscribe = () => {
       
        let data = {subBy: authState.empId, subFor: initiativeObject.initId};
        axios.post("http://localhost:3001/subscriptions", data, {
                headers : {
                accessToken : localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if(!response.data.error) {
                alert("Subscribed");
            }
            else {
                window.alert(response.data);
                console.log(response.data);
            }
        }).catch((err) => {
            window.alert("Already subscribed");
        });
    }

    return (
        <div className='flexcontainer initiativePage'>
            <div className='flexchild initiativeDesc' style={{border: "none", boxShadow: "none"}}>
                <div className='card'>
                    <div className='card-header'> {initiativeObject.initName} </div>
                    <div className='card-content'>
                    Id : {initiativeObject.initId}<br/>
                        {initiativeObject.initDate}<br/>
                        {initiativeObject.initDesc}<br/><br/>
                        {/*  {console.log(initiativeObject)} */}
                    {authState.status &&<button onClick={subscribe}>SUBSCRIBE</button>}
                    </div>
                </div>
            </div>
            <div className='flexchild'>
                <div className='subscriptionsList'>
                    <h3>Subscriptions List</h3>
                    {
                        subscriptionObject.length ? (subscriptionObject.map(element => 
                            <div className='list-item' key={element.subBy+element.subFor}>
                                {element.empName} subscribed on {element.subDate}
                            </div>
                            ) 
                        ) : ("No subscriptions yet")
                    }
                </div>
                <div className='contributionsList'>
                    <h3>Contributions List</h3>
                    {
                        contributionObject.length ? (contributionObject.map(element =>
                            <div className='list-item' key={element.contributionId} onClick={() => {
                                navigate(`/contributions/${element.contributionId}`);}}>
                                    {element.empName}   {element.contributionDesc}
                            </div>)
                        ) : ("No Contributions yet")
                    }
                    {authState.status && <button onClick={logContribution}>LOG CONTRIBUTION</button>}
                </div>
            </div>
        </div>
    )
}

export default Initiative
