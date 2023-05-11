import React, { useState,useEffect } from 'react'
import Loder from '../Loder'
import { useDispatch, useSelector } from 'react-redux'
import { updatepassword } from '../../UserAction/UserAction'
import './password.css'
import { useNavigate } from 'react-router-dom'
import { update_password_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'


const ChangePassword = () => {
    const [oldpassword, setoldPassword] = useState("")

    const [password, setPassword] = useState("")
    const [cpassword, setcPassword] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert=useAlert()

    // const { user, isAuthenticated } = useSelector((state) => state.user);
    const { isUpdated, loading, error } = useSelector((state) => state.profile);


    const updatePassword = (e) => {
        e.preventDefault()
        dispatch(updatepassword(oldpassword, password, cpassword));



    }

    useEffect(() => {
        if (isUpdated) {
            alert.success("Updated sucessfully")
            navigate('/profile')
            dispatch({ type: update_password_reset })
        }

        if(error){
            alert.error(error)
        }
    }, [error, isUpdated, loading, dispatch, navigate,alert])

    return (
        <>
            {loading ? <Loder /> :

                <div className="password_container">
                    <div className="inner_div">
                        <h3 className='login_heading'>Update Password</h3>
                        <form>
                            <input type="password" name='name' onChange={(e) => setoldPassword(e.target.value)} placeholder="Enter Your Old Password" />

                            <input type="password" name='name' onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your New Password" />

                            <input type="password" name='email' onChange={(e) => setcPassword(e.target.value)} placeholder="Enter Your Confirm Password" />

                        </form>
                        <button onClick={updatePassword}>Save</button>
                    </div>
                </div>
            }
        </>
    )
}

export default ChangePassword