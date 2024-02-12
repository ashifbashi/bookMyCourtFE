
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Constants/constance';


const SignUpBox = ({ setBoxName }) => {

    const hadleLogin = () => {
        setBoxName('login')
    }


    const [signUpData, setSignUpData] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        confpass: '',
    })



    const [err, setErr] = useState("")
    const fNameValidate = () => {


        if (signUpData.fName.trim() == "") {
            setErr("First name cannot be blank")
            return false
        }
        else if (signUpData.fName.length < 5) {
            setErr("Frist name must not be less than 5 charecters")
            return false
        }
        else {
            setErr("")
            return true
        }
    }

    const [iNameErr, setINameErr] = useState("")
    const lNameValidate = () => {

        if (signUpData.lName.trim() == "") {
            setINameErr("Last name cannot be blank")
            return false
        }
        else if (signUpData.lName.length < 5) {
            setINameErr("Last name must not be less than 5 charecters")
            return false
        }
        else {
            setINameErr("")
            return true
        }
    }

    const [emailErr, setEmailErr] = useState("")
    const emailValidate = () => {
        let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (signUpData.email.trim() == "") {
            setEmailErr("Email canot be blank")
            return false
        } else if (!signUpData.email.match(regEx)) {
            setEmailErr("Email not in global format")
            return false
        } else {
            setEmailErr("")
            return true
        }
    }

    const [passwordErr, setPasswordErr] = useState("")
    const passwordValidate = () => {
        if (signUpData.password.trim() == "") {
            setPasswordErr("password cannot be blank!")
            return false
        } else if (signUpData.password.length < 6 || signUpData.password.length > 20) {
            setPasswordErr("password length cannot be less than 6 charecters or morthan 20 charecters")
            return false
        } else {
            setPasswordErr("")
            return true
        }
    }

    const [confPasswordErr, setConfPasswordErr] = useState("")
    const confPasswordValidate = () => {
        if (signUpData.password != signUpData.confpass) {
            setConfPasswordErr("Password mismatch!")
            return false
        } else {
            setConfPasswordErr("")
            return true
        }
    }

    const [submitErr, setSubmitErr] = useState("")

    const formHandle = () => {
        if (!fNameValidate() || !lNameValidate() || !emailValidate() || !passwordValidate() || !confPasswordValidate()) {
            setSubmitErr("Please resolve tha errors")
            return false
        } else {
            setSubmitErr("")
            return true
        }
    }



    useEffect(() => {
        console.log(signUpData)
    }, [signUpData])


    const handleRegister = () => {
        try {

            axios.post(`${BASE_URL}/auth/signup`, signUpData).then((res) => {
                console.log(res)

                if (res.data.message === "signup successfulll") {
                    setBoxName('login')
                }

                if (res.data.message === "Email already exist") {
                    alert('email already exist')
                }

            })

        } catch (error) {

        }

    }

    return (

        <>
            <MDBCol md='4' className='position-relative'>

                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                <MDBCard className='my-5 bg-glass'>
                    <MDBCardBody className='p-5'>

                        <MDBRow>
                            <MDBCol col='6'>
                                <MDBInput value={signUpData.fName} onKeyUp={fNameValidate} onChange={(e) => { setSignUpData({ ...signUpData, fName: e.target.value }) }} wrapperClass='mb-1' label='First name' id='form1' type='text' />
                                <p style={{ color: "red", fontSize: "10px" }}>{err}</p>
                            </MDBCol>

                            <MDBCol col='6'>
                                <MDBInput onKeyUp={lNameValidate} onChange={(e) => { setSignUpData({ ...signUpData, lName: e.target.value }) }} wrapperClass='mb-1' label='Last name' id='form2' type='text' />
                                <p style={{ color: "red", fontSize: "10px" }}>{iNameErr}</p>
                            </MDBCol>
                        </MDBRow>

                        <MDBInput onKeyUp={emailValidate} onChange={(e) => { setSignUpData({ ...signUpData, email: e.target.value }) }} wrapperClass='mb-1' label='Email' id='form3' type='email' />
                        <p style={{ color: "red", fontSize: "10px" }}>{emailErr}</p>
                        <MDBInput onKeyUp={passwordValidate} onChange={(e) => { setSignUpData({ ...signUpData, password: e.target.value }) }} wrapperClass='mb-1' label='Password' id='form4' type='password' />
                        <p style={{ color: "red", fontSize: "10px" }}>{passwordErr}</p>
                        <MDBInput onKeyUp={confPasswordValidate} onChange={(e) => { setSignUpData({ ...signUpData, confpass: e.target.value }) }} wrapperClass='mb-1' label='Confirm Password' id='form5' type='password' />
                        <p style={{ color: "red", fontSize: "10px" }}>{confPasswordErr}</p>
                        <div className='d-flex justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                        </div>

                        <MDBBtn onClick={() => { formHandle(); handleRegister(); }} className='w-100 mb-4' size='md' type="submit" style={{backgroundColor:"#29c911", border:"2px solid #29c911"}}>sign up</MDBBtn>
                        <p style={{ color: "red", fontSize: "10px" }}>{submitErr}</p>

                        <div className="text-center">

                            <p><i style={{ color: "#0088bf" }} onClick={hadleLogin}>go to Login</i></p>

                        </div>

                    </MDBCardBody>
                </MDBCard>

            </MDBCol>

        </>
    )
}

export default SignUpBox;
