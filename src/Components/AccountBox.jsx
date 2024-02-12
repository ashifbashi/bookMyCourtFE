import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AxiosInstance from '../Config/AxiosInstance';
import './css/AccountBox.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toastError, toastSuccess } from '../Constants/plugins';
import { BASE_URL } from '../Constants/constance';

const AccountBox = () => {

    const { userDetails } = useSelector(state=>state.user)
    const [userPic, setUserPic]=useState(null)
    const [selectedImage, setSelectedImage] = useState('')
    const [userdata, setUserData]=useState({})
    const { id } = useParams()

  

    useEffect(()=>{
      userAccData()

    },[])


    const userPicUpdate =(e)=>{
      setUserPic(e.target.files[0])
      e.target.files[0] ? setSelectedImage(URL.createObjectURL(e.target.files[0])) : setSelectedImage(null)
    }

    const sbmtUserPic =()=>{
      let fileData = new FormData()
      fileData.append('image', userPic)

      AxiosInstance.post('/users/updateUser', fileData, { params: { userId: id} }, {headers:{"Content-Type": 'multipart/form-data'}}).then((response)=>{
        toastSuccess("Profile pic update successfully")
      }).catch((err)=>{
        toastError("profile pic not updated!")
      })
    }

    const userAccData =()=>{
      AxiosInstance.get('/users/userData', { params: { userId: id} }).then((response)=>{
        setUserData(response.data.response)
        
      }).catch((err)=>{
        console.log(err)
      })
    }
    
  return (
    <div className="container mt-4 acc-main-div">

        {/* <h3>Account</h3> */}

        <div className="acc-card">
        <div className="card_background_img"></div>
        <div className=""> <img className="card_profile_img" src={`${BASE_URL}/user/${userdata.userpic}`} />
        <div className="inp-image">
        <input type="file" name="userpic" className="custom-file-input" value={selectedImage.zip} onChange={userPicUpdate} />
        
        </div>
        {selectedImage && <img src={selectedImage} alt="" style={{ width: "80px",borderRadius: "120px" }} />}

      
         </div>
        <div className="user_details">
            <h3>{userDetails.fname} {userDetails.lname}</h3>
            <p></p>
            <p>{userDetails.email}</p>
            <p>Role: {userDetails.role===1? "Admin" :"User"}</p>

           {selectedImage && <div class="btn btn-success btn-center" onClick={sbmtUserPic}>Update</div>}
        </div>
    </div>
        
      
    </div>
  )
}

export default AccountBox
