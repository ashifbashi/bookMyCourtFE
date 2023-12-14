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

  return (
    <>

<MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

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
              <MDBNavbarLink active aria-current='page' href='/home'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            {userDetails.role === 1 && <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/addNewCourt'>
                Add new court
              </MDBNavbarLink>
            </MDBNavbarItem>}

            <MDBNavbarItem>
              <MDBNavbarLink href='/mybookings'>My bookings</MDBNavbarLink>
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
                  <MDBDropdownItem link>Action</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link onClick={doLogout}>Log Out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
      </MDBContainer>
    </MDBNavbar>
      
    </>
  )
}

export default MainNavbar
