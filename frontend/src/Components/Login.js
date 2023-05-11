import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState, useEffect } from 'react'
import { clearErrors, login } from '../UserAction/UserAction';
import { useDispatch, useSelector } from 'react-redux'
import Loder from './Loder';
import { getall_laundries } from '../UserAction/LaundryAction';
import { useAlert } from 'react-alert';
import { login_reset } from '../Constants/Constants';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()

    const { user, loading, isAuthenticated, error, sucess } = useSelector((state) => state.user);


    const [data, setData] = useState({ email: "", password: "" })
    const { email, password } = data;

    function Onchange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }



    const OnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    useEffect(() => {
        if (sucess) {
            alert.success("Logged in sucessfully")

            navigate("/");
            dispatch(getall_laundries())
            dispatch({ type: login_reset })

        }
        if(error){
            dispatch(clearErrors())
        }

       
    }, [dispatch, navigate, isAuthenticated, loading, error, user, alert, sucess])
    return (
        <>
            {loading ? <Loder /> :
                <div className="login_container">
                    <div className="form">
                        <h3 className='login_heading'>Login Here</h3>
                        <form>
                            <input type="email" name='email' onChange={Onchange} placeholder="Enter Your Email" required />
                            <input type="password" name='password' onChange={Onchange} placeholder="Enter Your Password" required />

                        </form>
                        <button onClick={OnSubmit}>Submit</button>
                        <div className="login_links">
                            <Link to="/password/forgot">forgot password</Link>

                            <Link to="/register">Create New Account</Link>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Login