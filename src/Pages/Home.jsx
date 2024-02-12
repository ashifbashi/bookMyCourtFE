import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../Components/Cards';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Footer';
import AxiosInstance from '../Config/AxiosInstance';


const Home = () => {
  
  const [courtData, setCourtData]=useState([])
  const navigate = useNavigate()

  useEffect(()=>{
     getAllCourtsData()
  },[])

  const getAllCourtsData = ()=>{
     AxiosInstance.get('/users/getAllCourtsData').then((response)=>{

       setCourtData(response.data.response)
     })
     .catch(err=>{

        if(err.response.data.message==='unauthorized user'){

          localStorage.clear()
          navigate('/')
        }
     })
  }
console.log(courtData)
  return (
    <div style={{backgroundColor:'#fdfdfd'}}>
      <Navbar />
      <div className="container" style={{marginTop:"50px"}}>
      <div className="row">
        
        {courtData.map((court)=><div className="col-md-3"><Cards court={court} /></div> )}


        
        
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
