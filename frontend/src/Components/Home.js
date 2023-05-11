import React, { useEffect } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../UserAction/UserAction'

const Home = () => {
  const dispatch=useDispatch();

  const { user, loading, isAuthenticated, error, sucess } = useSelector((state) => state.user);


  useEffect(() => {
    if(error){
      dispatch(clearErrors())
    }
    
  }, [error])
  
  return (
    <>
      <div className='home-container'>

        <div className="get_started">
          <h2>
           To Make Your Laundry Request <Link to='/dashboard/request'>Click here</Link> 
          </h2>
        </div>
       
      </div>


      <div className="footer_div">
                <div className="footer_item">
                    <p>Copyright @ Laundry Management System 2019</p>
                </div>
            </div>
    </>
  )
}

export default Home