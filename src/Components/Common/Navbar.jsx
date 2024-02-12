import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainNavbar = () => {

  const [openBasic, setOpenBasic] = useState(false);
  const { userDetails } = useSelector(state=>state.user)
  const navigate=useNavigate()

  const doLogout=()=>{
    // localStorage.remove('token')
    // localStorage.remove('user')
    localStorage.clear()

    navigate('/')

  }


  // function menuOpen() {
  //   var x = document.getElementById("myTopnav");
  //   if (x.className === "topnav") {
  //     x.className += " responsive";
  //   } else {
  //     x.className = "topnav";
  //   }
  // }

  return (
    <>

<MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand onClick={()=> navigate('/home')}>Bookyourcourt</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' onClick={()=> navigate('/home')}>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            {userDetails.role === 1 && <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' onClick={()=> navigate('/addNewCourt')}>
                Add new court
              </MDBNavbarLink>
            </MDBNavbarItem>}

            <MDBNavbarItem>
              <MDBNavbarLink onClick={()=> navigate('/mybookings')} >My bookings</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
         
            </MDBNavbarItem>


          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
            <MDBBtn color='primary'>Search</MDBBtn>
          </form>
        
        </MDBCollapse>
        <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link ms-2' role='button'>
                {userDetails.fname} {userDetails.lname}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link onClick={()=>navigate(`/account/${userDetails.userId}`)}>Account</MDBDropdownItem>
                  <MDBDropdownItem link onClick={doLogout}>Log Out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
      </MDBContainer>
    </MDBNavbar>


{/* <div className="m-nav" style={{display:"flex", justifyContent:"space-between"}}>

  <div className="n-f-itm"><a href="#" className="logo"><b>Bookmycourt</b></a></div>

  <div class="topnav n-s-itm" id="myTopnav">
  <a href="#" className="n-item">Home </a>
  <a href="#" className="n-item">Add new court</a>
  <a href="#" className="n-item">My bookings</a>
</div>

  <div className="n-t-itm">  
    <i className="fa fa-bars menu" onClick={menuOpen}></i>
    <a href="#"><i class="fa fa-user"></i> </a>
  </div>

</div> */}





      
    </>
  )
}

export default MainNavbar
