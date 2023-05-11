import React from 'react'
import './Profile.css'

const Profile = (props) => {



  

    
  return (
    <div className='main_container'>

        <div className="profile_container">
            <h3>NAME : {props.user.name}</h3>
            <h3>ID : {props.user._id}</h3>

        </div>

    </div>
  )
}

export default Profile