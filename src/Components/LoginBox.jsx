import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MDBBtn, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import { BASE_URL } from '../Constants/constance';
import { useNavigate } from 'react-router-dom'
import { toastError, toastSuccess } from '../Constants/plugins';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail } from '../Toolkit/userSlice';


const LoginBox = ({setBoxName}) => {

    const navigate = useNavigate()
    const [loginCred, setLoginCred]=useState({
        email: '',
        password: ''
    })
    //redux
    const {userDetails} = useSelector((state)=>state.user)
    const dispatch = useDispatch()



    const submitLogin =()=>{

        try {


            if(loginCred.email && loginCred.password){

                axios.post(`${BASE_URL}/auth/login`, loginCred).then((res)=>{
                   console.log(res)

                   if(res.data.message === "Login successfull" && res.data.token){
                       localStorage.setItem('token', res.data.token)
                       const parsedToken = parseJwt(res.data.token)
                       localStorage.setItem('user', JSON.stringify(parsedToken) )
                         dispatch(setUserDetail(parsedToken))
                       toastSuccess("Login success")
                       navigate('/home')

                   }
                    
                   if(res.data.message === "Invalid credential"){
                        toastError("Invalid credential")
                   }

                })

            }else{
                toastError("Credential not filled")
            }
            
        } catch (error) {
            console.log(error)
            
        }

        
    }

    console.log(loginCred.email)
    const handleSignUp = () => {
        setBoxName('signup')
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }





    return (
        <>


            <MDBCol md='4' className='position-relative'>

                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                <MDBCard className='my-5 bg-glass'>
                    <MDBCardBody className='p-5'>

                        <MDBInput onChange={(e)=>{setLoginCred({...loginCred, email:e.target.value})}} wrapperClass='mb-4' label='Email' id='form3' type='email' value={loginCred.email} />
                        <MDBInput onChange={(e)=>{setLoginCred({...loginCred, password:e.target.value})}} wrapperClass='mb-4' label='Password' id='form4' type='password' value={loginCred.password} />

                        <div className='d-flex justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                        </div>

                        <MDBBtn onClick={submitLogin} className='w-100 mb-4' size='md' style={{backgroundColor:"#29c911", border:"2px solid #29c911"}}>Login</MDBBtn>

                        <div className="text-center">

                            <p>dont have an account <span style={{color:"#0088bf"}} onClick={handleSignUp}>Register here</span></p>

                        </div>
 
                    </MDBCardBody>
                </MDBCard>

               {/* <button onClick={updateUserRole}>value: {userRole}</button> */}

            </MDBCol>





        </>
    )
}

export default LoginBox;
