import Navbar from './Components/Navbar';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Home from './Components/Home';
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getUser } from './UserAction/UserAction';
import { useEffect } from 'react';
import store from './Store';
import Protected from './Components/Protected';
import LaundryRequest from './Components/LaundryRequest';
import Profile from './Components/profile/Profile';
import UpdateProfile from './Components/profile/UpdateProfile';
import ChangePassword from './Components/profile/ChangePassword';
import Forgetpass from './Components/profile/Forgetpass';
import Otp from './Components/profile/Otp';
import ResetPassword from './Components/profile/ResetPassword';
import Dashboard from './Components/Dashboard/Dashboard';
// import Footer from './Components/Footer/Footer'
import Request from './Components/Request/Request';
import { getall_laundries } from './UserAction/LaundryAction';
import Status from './Components/Dashboard/Status';
import Requestitem from './Components/Dashboard/Requestitem';
import SucessRequest from './Components/Dashboard/SucessRequest';
import Inprogress from './Components/Dashboard/Inprogress';
import Accepted from './Components/Dashboard/Accepted';
import Notification from './Components/Notification/Notification';
import Update from './Components/AdminUpdate/Update';
import Protected2 from './Components/Protected2';


function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user, error, loading } = useSelector(state => state.user)


  useEffect(() => {

    store.dispatch(getUser());
      store.dispatch(getall_laundries())

  

  }, [])


  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/password/forgot" element={<Forgetpass />} />
          <Route exact path="/password/forgot/otp" element={<Otp />} />
          <Route exact path="/password/reset" element={<ResetPassword />} />



          <Route element={<Protected />}>
            <Route exact path="/laundry/request" element={<LaundryRequest />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/profile/update" element={<UpdateProfile />} />
            <Route exact path="/password/update" element={<ChangePassword />} />
            <Route exact path="/dashboard/overview" element={<Dashboard />} />
            <Route exact path="/dashboard/request" element={<Request />} />
            <Route exact path="/dashboard/status" element={<Status />} />
            <Route exact path="/dashboard/laundry/finish" element={<SucessRequest />} />
            <Route exact path="/dashboard/laundry/request" element={<Requestitem />} />
            <Route exact path="/dashboard/laundry/accepted" element={<Accepted />} />
            <Route exact path="/dashboard/laundry/inprogress" element={<Inprogress />} />
            <Route exact path="/dashboard/notification" element={<Notification />} />

          </Route>

          <Route element={<Protected2 isAdmin={true} />}>
            <Route exact path="/dashboard/request/update" element={<Update />} />
            <Route exact path="/dashboard/request/update/:id" element={<Update />} />

          </Route>


        </Routes>
        {/* <Footer /> */}

      </BrowserRouter>
    </div>



  );
}

export default App;
