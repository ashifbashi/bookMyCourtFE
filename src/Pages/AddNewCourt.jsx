import React from 'react';
import AddCourtForm from '../Components/AddCourtForm';
import MainNavbar from '../Components/Common/Navbar';

const AddNewCourt = () => {
  return (
    <>
    <MainNavbar />
    <div className="container">
     <AddCourtForm />
     </div>
    </>
  )
}

export default AddNewCourt
