import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const initialValues = {empId:'',empName:'',email: '',designation: '', phNo: '', pwd: ''};

    let navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/employees/register", data).then((response) => {
        console.log("Registered successfully");
        navigate("/");  
      });
    };

    const validationSchema = Yup.object().shape({
        empId: Yup.number().required("*required"),
        empName: Yup.string().required("*required"),
        designation: Yup.string().required("*required"),
        email: Yup.string().email("Invalid email").required("*required"),
        phNo: Yup.number().required("*required"),
        pwd: Yup.string().min(8,"minimum 8 characters required").required("*required")
    });

    return (
        <div className="RegisterPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ values }) => (
                    <Form className='card' style={{margin:"20px auto", height:"auto"}}>
                        <div className='card-header'>Register</div>
                        <div className='card-content'>
                            <div>
                                <label>Employee Id</label>
                                <ErrorMessage className='errormsg' name='empId' component="span"/>
                                <Field name="empId" placeholder="Enter ID" type="text" autoComplete="off" /><br/>
                            </div>
                            <div>
                                <label>Employee Name</label>
                                <ErrorMessage className='errormsg' name='empName' component="span"/>
                                <Field name="empName" placeholder="Enter Name" type="text" autoComplete="off" /><br/>
                            </div>
                            <div>
                                <label>Employee Email</label>
                                <ErrorMessage className='errormsg' name='email' component="span"/>
                                <Field type="text" name="email" placeholder="Enter email Id" autoComplete="off"/><br/>
                            </div>
                            <div>
                                <label>Password</label>
                                <ErrorMessage className='errormsg' name='pwd' component="span"/>
                                <Field type="password" name="pwd" placeholder="Enter Password" autoComplete="off"/><br/>
                            </div>
                            <div>
                                <label>Employee Designation</label>
                                <ErrorMessage className='errormsg' name='designation' component="span"/>
                                <Field name="designation" placeholder="Enter Employee Role" type="text" autoComplete="off" /><br/>
                            </div>
                            <div>
                                <label>Employee Phone</label>
                                <ErrorMessage className='errormsg' name='phNo' component="span"/>
                                <Field type="number" name="phNo" autoComplete="off" />
                            </div><br/>
                            <button type='submit' style={{display : 'block'}}> REGISTER </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register
