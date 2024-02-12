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
import './css/card.css'

export default function Cards({court}) {

  const navigate =useNavigate()


  return (
    <MDBCard className="m-card" onClick={()=>navigate(`/courtuserview/${court._id}`)}>
      <MDBCardImage style={{height:"200px",objectFit:"cover"}} src={`${BASE_URL}/courts/${court.courtPic}`} position='top' alt='...' />
      <MDBCardBody>
         <MDBCardTitle>{court?.courtName}</MDBCardTitle>
         <MDBCardSubTitle className="c-type">{court?.type}</MDBCardSubTitle>
         <MDBCardSubTitle className="c-location">{court?.location}</MDBCardSubTitle>
        {/* <MDBCardText>
          Some 
        </MDBCardText> */}
      </MDBCardBody>
    </MDBCard>
  );
}