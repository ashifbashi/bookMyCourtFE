import React, { useState } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import AxiosInstance from '../Config/AxiosInstance';
import { toastError, toastSuccess } from '../Constants/plugins';
import { useNavigate } from 'react-router-dom';

export default function AddCourtForm() {
  const [formValue, setFormValue] = useState({
    courtName: '',
    location: '',
    address: '',
    type: '',
  });
  const navigate = useNavigate()
  const [courtPicture, setCourtPicture]=useState(null)
  const [selectedImage, setSelectedImage] = useState('')

  const onChange = (e) => {

    setFormValue({ ...formValue, [e.target.name]: e.target.value });

  };

  const addFileData =(e)=>{
    setCourtPicture(e.target.files[0])
    e.target.files[0] ? setSelectedImage(URL.createObjectURL(e.target.files[0])) : setSelectedImage(null)
  }


  const addCourtData = ()=>{

    let fileData = new FormData()
    fileData.append('image', courtPicture)

    AxiosInstance.post('/admin/addCourtData', fileData,{params:formValue},{headers:{"Content-Type": 'multipart/form-data'}}).then((response)=>{
       
           toastSuccess("New court added")
           navigate('/home')
    })
    .catch(err=>{
      toastError("Some thing went wrong")
    })
  }

  return (
    <MDBValidation className='row g-3'>
      <p>{formValue.courtName}</p>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.fname}
          name='courtName'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Court name'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.lname}
          name='location'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Location'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInputGroup >
          <input
            name='type'
            type='text'
            onChange={onChange}
            className='form-control'
            id='validationCustomUsername'
            placeholder='Type'
            required
          />
        </MDBInputGroup>
      </MDBValidationItem>
      <MDBValidationItem className='col-md-6' feedback='Please provide a valid city.' invalid>
        <textarea
          type='text-area'
          value={formValue.city}
          name='address'
          onChange={onChange}
          id='validationCustom03'
          required
          label='Address'
          style={{ width: "100%" }}
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4' >
        <MDBInput
          type='file'
          value={formValue.zip}
          name='courtImage'
          onChange={addFileData}
          id='validationCustom05'
          required
          label='Court image'
        />
      </MDBValidationItem>

      {selectedImage && <img src={selectedImage} alt="" style={{ width: "150px" }} />}
      <div className='col-12'>
        <MDBBtn type='submit' onClick={addCourtData}  style={{backgroundColor:"#29c911",border:"none"}}>Submit form</MDBBtn>{" "}
        <MDBBtn type='reset' style={{backgroundColor:"#29c911",border:"none"}}>Reset form</MDBBtn>
      </div>
    </MDBValidation>
  );
}
