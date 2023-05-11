import React from 'react'
import './UpdateProfile.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getUser, updateprofile } from '../../UserAction/UserAction'
import Loder from '../Loder'
import { update_profile_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'


const UpdateProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()


    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { isUpdated, loading, error } = useSelector((state) => state.profile);


    const [data, setData] = useState({ name: "", phone: "" })

    function Onchange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const updateProfile = (e) => {
        e.preventDefault()
        dispatch(updateprofile(data.name, data.phone))
            
    }


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("profile updated")
            navigate("/profile")
            dispatch(getUser())
            dispatch({ type: update_profile_reset })
        }
    }, [dispatch, navigate, isAuthenticated, loading, error, user, alert, isUpdated])
    return (
        <>

            {loading ? <Loder /> :

                <div className="login_container">
                    <div className="form">
                        <h3 className='login_heading'>Update Profile</h3>
                        <form>
                            <input type="name" name='name' onChange={Onchange} placeholder="Enter Your New Name" />

                            <input type="number" name='phone' onChange={Onchange} placeholder="Enter Your New Phone Number" />

                        </form>
                        <button onClick={updateProfile}>Update</button>
                    </div>
                </div>
            }
        </>
    )
}

export default UpdateProfile