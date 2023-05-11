import React, { useEffect, useState } from 'react'
import Loder from '../Loder'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, forgotpassword, getUser, otpverify } from '../../UserAction/UserAction'
import { otp_reset } from '../../Constants/Constants'
import { useAlert } from 'react-alert'


const Otp = () => {
    const [opt, setOpt] = useState(null)
const alert=useAlert()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error,isUpdated } = useSelector((state) => state.profile);

    const Otpsubmit=()=>{
        dispatch(otpverify(opt))

    }



    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("successfully submited")
            dispatch(getUser())
           navigate("/password/reset")
            dispatch({type:otp_reset})
        }
      
    }, [loading,isUpdated,error,navigate,alert,dispatch])
    
  return (
    <>
    {loading ? <Loder /> :

    <div className="forgotpassword_container">
        <div className="inner_div">
            <h3 className='login_heading'>OTP Verification</h3>
            <form>
                <input type="number" name='name' onChange={(e) => setOpt(e.target.value)} placeholder="Enter OTP" />

            </form>
            <button onClick={forgotpassword}>Resend</button>

            <button onClick={Otpsubmit}>Submit</button>
        </div>
    </div>
}
</>
  )
}

export default Otp