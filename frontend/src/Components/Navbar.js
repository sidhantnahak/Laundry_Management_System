import React from 'react'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Logout } from '../UserAction/UserAction'
import { useAlert } from 'react-alert'
import { register_reset } from '../Constants/Constants'
import { admin_getall_laundries, getall_laundries } from '../UserAction/LaundryAction'
import Loder from './Loder'

const Navbar = () => {


  const navigate = useNavigate()
  const alert = useAlert()
  const Toogle = () => {
    let toogle_btn_icon = document.querySelector('.bar i');
   let dropdown = document.querySelector('.sidebar')
    let profile_div = document.querySelector('.arrow_div')
    let arrow = document.querySelector('#arrow')

    dropdown.classList.toggle('open')
    profile_div.classList.toggle('open')

    const isOpen = dropdown.classList.contains('open');
    arrow.classList = isOpen ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"

    toogle_btn_icon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"
  }
  // window.onclick = function () {
   
  //   let toogle_btn_icon = document.querySelector('.bar i');
  //  let dropdown = document.querySelector('.sidebar')
  //   let profile_div = document.querySelector('.arrow_div')
  //   let arrow = document.querySelector('#arrow')

  //   // profile_div.classList.toggle('open')

    
    


  // }
  
  const dispatch = useDispatch()
  const { isAuthenticated, error, sucess, loading, user } = useSelector(state => state.user)

  const logOUt = () => {

    Toogle()
    dispatch(Logout())

  }

  useEffect(() => {
    if (error) {
      alert.error(error)
    }

    if (sucess && !isAuthenticated) {
      alert.success("Logged out sucessfully")

      navigate('/login')
      dispatch({ type: register_reset })
    }


  }, [error, isAuthenticated, navigate, sucess, dispatch, alert, loading, user])


  return (
    <>

      {loading ? <Loder /> :
        <>
          <header>
            <div className="navbar">

              <div className="logo"><Link to="/">Laundry Management System</Link></div>
              {isAuthenticated ?
                <>
                  <ul>
                    <li><Link to="/dashboard/overview">Dashboard</Link></li>
                    <li><Link to="/dashboard/request">Request</Link></li>
                    <li><Link to="/dashboard/status"> Status</Link></li>

                  </ul>
                  <div onClick={Toogle} className='arrow_div'>
                    <i id='profile' className="fa-solid fa-user"></i>
                    <i id='arrow' className="fa-solid fa-angle-down"></i>
                  </div>
                  <div onClick={Toogle} className="bar">
                    <i className="fa-solid fa-bars" />
                  </div>
                </>
                :
                <li><Link className='start' to="/login">Login</Link></li>

              }
            </div>

          </header>
          <div className="sidebar"onClick={Toogle}>
            <ul>
              <li><Link to="/profile">Profile</Link></li>

              <li><Link onClick={() => dispatch(getall_laundries())} to="/dashboard/overview">Dashboard</Link></li>
              <li><Link  to="/dashboard/request">Laundry Request</Link></li>
              <li><Link to="/dashboard/status">Request Status</Link></li>


              {user && user.role === "admin" && <li><Link onClick={() => dispatch(admin_getall_laundries())} to="/dashboard/request/update">Update Request</Link></li>} 
               <li><Link to="/dashboard/notification">Notification</Link></li>
              <li> <Link onClick={logOUt} className="start" to="">Logout</Link></li>

            </ul>
          </div>
        </>
      }

    </>
  )
}


export default Navbar