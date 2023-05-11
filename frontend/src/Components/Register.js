import { React, useState, useEffect } from 'react'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../UserAction/UserAction'
import { useNavigate,Link } from 'react-router-dom'
import Loder from './Loder'
import { useAlert } from 'react-alert'
import { register_reset } from '../Constants/Constants'


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert=useAlert()

  const [data, setData] = useState({ name: "", email: "", password: "",phone:null })
  const {  isAuthenticated, error,loading,sucess } = useSelector((state) => state.user);

  const Onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const { email, password, name, phone } = data;
  const onsubmit = (e) => {
    e.preventDefault()
    dispatch(register(name, email,phone, password))
  }

  useEffect(() => {
    
    if (sucess) {
      alert.success("Sucessfully registered")
      navigate('/');
      dispatch({type:register_reset})
    }
    if(error){
      dispatch(clearErrors())
  }
  }, [dispatch, isAuthenticated, navigate, error,alert,sucess])

  return (
  <>
  {loading?<Loder/>:
    <div className="register_form">
      <div className="form2">
        <h3>Register Here</h3>
        <form >
          <input type="text" name='name' onChange={Onchange} placeholder="Enter Your Name" />

          <input type="email" name='email' onChange={Onchange} placeholder="Enter Your Email" />
          <input type="number" onWheel={()=>document.activeElement.blur()} name='phone' onChange={Onchange} placeholder="Enter Your Mobile NUmber" />
          <input type="password" name='password' onChange={Onchange} placeholder="Enter Your Password" />
        </form>
        <button onClick={onsubmit}>Submit</button><Link className='signin' to="/login">Already registerd</Link>
      </div>
    </div>}
  </>
  )
}

export default Register