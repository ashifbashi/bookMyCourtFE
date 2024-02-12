
import './App.css';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ToastContainter from './Components/Common/ToastContainer'
import AddNewCourt from './Pages/AddNewCourt';
import CourtUserView from './Pages/CourtUserView';
import MyBookings from './Pages/MyBookings';
import { AdminAuth, LoginAuth, UserAuth } from './Authorization/authorization';
import Account from './Pages/Account';

// import 'react-toastify/dist/ReactToastify.css';
  
function App() {
  return (
    <>
   <ToastContainter />
   
      <BrowserRouter>
        <Routes>
          
          <Route element={<LoginAuth />}>
          <Route index element={<Login />} />
          </Route>

          {/* user rout */}
          <Route element={<UserAuth />}>
          <Route path='/home' element={<Home />} />
          <Route path='/courtuserview/:id' element={<CourtUserView />} />
          <Route path='/mybookings' element={<MyBookings />} />
          </Route>


          {/* admin rout */}
          <Route element={<AdminAuth />}>
          <Route path='/addNewCourt' element={<AddNewCourt />} />
          </Route>

          <Route path='/account/:id' element={<Account />} />

        
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
