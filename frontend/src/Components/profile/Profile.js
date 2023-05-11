import React from 'react'
import './profile.css'
import { Link } from 'react-router-dom'
import image from '../images/profile.png'
import { useSelector } from 'react-redux'

const Profile = () => {

    const{ user}=useSelector(state=>state.user)
    return (
    
            <div className="profileContainer">
                <div>
                    <h1>My Profile {user.role==="admin"?("( A ) " ): ( "( U )" )}</h1>
                    <img src={image} alt="not found" />
                    <Link to="/profile/update">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{user.date}</p>
                    </div>

                    <div>
                        <Link to="/dashboard/status">My Laundry requests</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
    )
}

export default Profile