import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext";

function Contribution() {

    let { id } = useParams();
    const [contributionObject, setContributionObject] = useState({});
    const [reviewObject, setReviewObject] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        
        if(mounted) {
            axios.get(`http://localhost:3001/contributions/${id}`).then((response) => {
                setContributionObject(response.data);
            });
        }

        return () => mounted = false;
    },[id]);

    useEffect(() => {
        let mounted = true;
        
        if(mounted) {
            axios.get(`http://localhost:3001/reviews/findbycontribution/${id}`).then((response) => {
                        setReviewObject(response.data);
            }).catch(err => {
            console.log("no reviews", err);
            setReviewObject([])
            });
        }

        return () => mounted = false;
    },[id]);

    const review = async () => {
        if(newReview!=="") {
            const data = {reviewedBy: authState.empId, reviewedFor: contributionObject.contributionId, rating: rating, comment: newReview};
            await axios.post("http://localhost:3001/reviews", data, {
                headers : {
                    accessToken : localStorage.getItem("accessToken")
                }
            }).then((response) => {
                if(response.data.error) {
                    console.log(response.data.error);
                } else {
                alert("Review created", response.data);
                window.location.reload(false);
                }  
            }).catch((error) => {
                window.alert(error);
            });
        } else {
            window.alert("Review cannot be empty");
        }

    };

    const delCon = async () => {
        await axios.delete(`http://localhost:3001/contributions/deletebyid/${contributionObject.contributionId}`, {
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((res) => {
            if(res.data.error)
                window.alert(res.data.error);
            else {
                window.alert("Contribution deleted");
                navigate(`/initiatives/${contributionObject.contributedFor}`)
            }
        });
    };

    const delRev = async (delReviewId) => {
        if(delReviewId !== 0) {
            await axios.delete(`http://localhost:3001/reviews/deletebyid/${delReviewId}`, {
                headers:{
                    accessToken:localStorage.getItem("accessToken")
                }
            }).then((res) => {
                if(res.data.error)
                    window.alert(res.data.error);
                else {
                    window.alert("Review deleted");
                }
            });
        }
        delReviewId = 0;
        window.location.reload(false);
        return;
    }; 

    return (
        <div className='flexcontainer contributionPage'>
            <div className='flexchild' style={{border:"none", boxShadow:"none"}}>
                <div className='card contributionDesc'>
                    <div className='card-header'>Contribution Info</div>
                    <div className='card-content'>
                        Contribution ID : {contributionObject.contributionId}<br/><br/>
                        Contributed By : {contributionObject.empName}<br/><br/>
                        Contribution : {contributionObject.contributionDesc}<br/><br/>
                        {authState.empId === contributionObject.contributedBy && <button onClick={() => delCon()}>DELETE</button>}
                    </div>
                </div>
            </div>
            <div className='flexchild'>
                <div className='reviewList'>
                    <h3>Reviews</h3>
                    {   
                        (reviewObject.length) ?
                            (reviewObject.map(element =>
                                <div className='list-item' key={element.reviewId}>
                                    {element.empName} : {element.reviewedDate} : {element.comment}
                                    {
                                        authState.empId === element.reviewedBy && 
                                        <span style={{color:"red", textDecoration:"underline"}} onClick = {(() => {delRev(element.reviewId)})}>  Delete  </span>
                                    }
                                </div>)
                            ) : (<div>No reviews yet<br/><br/></div>)
                    }
                    {authState.status && authState.empId !== contributionObject.contributedBy && 
                        <div>
                            
                            Comment :&nbsp;
                            <input style={{display: "inline-block"}} onChange={(event) => {setNewReview(event.target.value)}} /> &nbsp;
                            Rating :&nbsp;
                            <input name="rating"
                                   type="number"
                                   style={{display: "inline-block"}}
                                   pattern='[1-5]'
                                   onChange={(event) => {setRating(event.target.value)}}
                                   />
                            <br/><br/>
                            <button style={{display: "inline-block"}} onClick={review}>WRITE A REVIEW</button>  
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Contribution
