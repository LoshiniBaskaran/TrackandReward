import React from 'react'
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div>
            Page not Found
            <button onClick={() => {
                navigate("/");
            }}>Redirect to Home Page</button>
        </div>
    )
}

export default PageNotFound