import React, { useEffect, useState } from 'react'
import Loder from '../Loder'
import { useDispatch, useSelector } from 'react-redux'
import './forgetpassword.css'
import { clearErrors, forgotpassword } from '../../UserAction/UserAction'
import { useNavigate } from 'react-router-dom'
import { forget_password_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'


const Forgetpass = () => {

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()

    const [email, setEmail] = useState("")
    const { loading, error,isUpdated } = useSelector((state) => state.profile);


    const forgetPassword = (e) => {
        e.preventDefault()
        dispatch(forgotpassword(email))

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            navigate("/login")
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Otp sent sucessfully");
            navigate("/password/forgot/otp");
            dispatch({type:forget_password_reset})

        }
        

    }, [loading, error,isUpdated,alert,dispatch,navigate])


    return (
        <>
            {loading ? <Loder /> :

                <div className="forgotpassword_container">
                    <div className="inner_div">
                        <h3 className='login_heading'>Forgot Password</h3>
                        <form>
                            <input type="email" name='name' onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Adress" />

                        </form>
                        <button onClick={forgetPassword}>Submit</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Forgetpass