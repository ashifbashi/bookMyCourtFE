import React, { useEffect, useState } from 'react'
import AxiosInstance from '../Config/AxiosInstance'
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../Constants/constance';

const MyBookingCard = () => {
    const [myBookings, setMyBookings] = useState([])

    useEffect(() => {
      getMyBookingData()
    }, [])
  
    const getMyBookingData = () => {
      AxiosInstance.get('/users/getMyBookingData').then((res) => {
          console.log(res.data)
        setMyBookings(res.data)
      })
        .catch((err) => {
          console.log(err);
        })
    }

  return (
    <div>

<div className="container mt-4">
        <div className="row">
            {myBookings.map((bookedData)=>{
                return(

                    <div className="col-md-3 p-2">

                    <Card style={{border:"2px solid #29c911", borderRadius:'10px' }}>
                      <Card.Header><h6>{bookedData.courtData.courtName}</h6></Card.Header>
                      <div className="p-2">
                      <Card.Img variant="" style={{height:'100px',objectFit:'cover'}}  src={`${BASE_URL}/courts/${bookedData.courtData.courtPic}`} />
                      </div>
                      <Card.Body>
                        <Card.Title>{bookedData.slot.name}</Card.Title>
                        <Card.Text>Booked date: {bookedData.date}</Card.Text>
                        <Card.Text>{bookedData.courtData.location}</Card.Text>
                        <Card.Text>{bookedData.courtData.address}</Card.Text>
                      </Card.Body>
                    </Card>
        
                  </div>

                )
            })}
 
        </div>

      </div>

      
    </div>
  )
}

export default MyBookingCard
