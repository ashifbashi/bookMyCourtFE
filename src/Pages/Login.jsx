import React from 'react';
import { useState } from 'react';
import './Login.css';
import { Button, Form } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import LoginBox from '../Components/LoginBox';
import SignUpBox from '../Components/SignUpBox';

const Login = () => {

  const [boxName, setBoxName] = useState('login')


  return (

    <>


    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>


      <MDBRow>

        <MDBCol md='7' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Book your <br />
            <span style={{ color: '#29c911' }}>Court</span>
          </h1>

          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        { boxName === "login" && <LoginBox setBoxName={setBoxName} /> }
        { boxName === "signup" && <SignUpBox setBoxName={setBoxName} />}


        <MDBCol md='1'></MDBCol>

      </MDBRow>

    </MDBContainer>



 
    </>
  )
}

export default Login
