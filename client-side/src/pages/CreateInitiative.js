import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateInitiative() {
    const initialValues = {initName:'',initDesc:'',initStatus: '',initDate: ''};

    let navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/initiatives", data, {
            headers : {accessToken : localStorage.getItem("accessToken")}
        }).then((response) => {
            if(response.data.error) {
                console.log(response.data.error);
            } else {
            alert("Initiative created");
            navigate("/");
            }  
      });
    };

    const validationSchema = Yup.object().shape({
        initName: Yup.string().required("*required"),
        initDesc: Yup.string().min(20).required("*required")
    });

    return (
        <div className="createInitiativePage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ values }) => (
                    <Form className='card'>
                        <div className='card-header'>Create Initiative</div>
                        <div className='card-content'>
                            <div>
                                <label>Initiative Name</label>
                                <ErrorMessage className='errormsg' name='initName' component="span"/>
                                <Field name="initName" placeholder="Enter Name" type="text" autoComplete="off" /><br/>
                            </div>
                            <div>
                                <label>Initiative Description</label>
                                <ErrorMessage className='errormsg' name='initDesc' component="span"/>
                                <Field name="initDesc" placeholder="Enter Whats and Hows" type="text" autoComplete="off" /><br/>
                            </div>
                            <div>
                                <label>
                                    <Field style={{display : 'inline-block'}} type="radio" name="initStatus" value="Yet to be Initiated" />
                                    Yet to be Initiated
                                </label>
                                <label>
                                    <Field style={{display : 'inline-block'}} type="radio" name="initStatus" value="Initiated" />
                                    Initiated
                                </label>
                                <label>
                                    <Field style={{display : 'inline-block'}} type="radio" name="initStatus" value="Completed" />
                                    Completed&nbsp;
                                </label>
                            </div>
                            <div>
                                <br/>
                                {((values.initStatus !== "" && values.initStatus !== "Yet to be Initiated") ? (
                                    <div>
                                        <label>Initiated Date</label>
                                        <ErrorMessage className='errormsg' name='initDate' component="span"/>
                                        <Field type="date" name="initDate" /><br/>
                                    </div>
                                    ) : (values.initDate=null))}
                            </div>
                            <button type='submit' style={{display : 'block'}}>CREATE INITIATIVE</button> 
                        </div>    
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateInitiative
