import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCardSubTitle
} from 'mdb-react-ui-kit';
import { BASE_URL } from '../Constants/constance';
import { useNavigate } from 'react-router-dom';

export default function Cards({court}) {

  const navigate =useNavigate()


  return (
    <MDBCard style={{marginBottom:"20px",cursor: "pointer"}} onClick={()=>navigate(`/courtuserview/${court._id}`)}>
      <MDBCardImage style={{height:"200px",objectFit:"cover"}} src={`${BASE_URL}/courts/${court.courtPic}`} position='top' alt='...' />
      <MDBCardBody>
         <MDBCardTitle>{court?.courtName}</MDBCardTitle>
         <MDBCardSubTitle>{court?.type}</MDBCardSubTitle>
         <MDBCardSubTitle>{court?.location}</MDBCardSubTitle>
        <MDBCardText>
          Some 
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
}