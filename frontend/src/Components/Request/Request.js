import React, { useEffect, useState } from 'react'
import './request.css'
import { useDispatch, useSelector } from 'react-redux'
import { add_laundry_request, getall_laundries } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import { laundry_request_reset } from '../../Constants/Constants';
import Loder from '../Loder';
import {useAlert} from 'react-alert'
import { getUser } from '../../UserAction/UserAction';

const Request = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert=useAlert()

    const {iscreated,loading,error}=useSelector(state=>state.laundries)
    const [credentials, setCredentials] = useState({ date: null, top: "", bottom: "", service_type: "", contact: null, description: "", cloth_type: "" })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    const requestRegister = (e) => {
        e.preventDefault()
        dispatch(add_laundry_request(credentials))
    }

    useEffect(() => {
        if(error){
            alert.error(error)
        }

        if(iscreated){
            alert.success("Request Confirmed succefully")
            dispatch(getall_laundries())
            dispatch(getUser())
            navigate("/dashboard/overview")
            dispatch({type:laundry_request_reset} )
        }

    }, [navigate,iscreated,loading,error,alert,dispatch])


    return (
        <>
        {loading?<Loder/>:
            <div className="request_container">

                <div className="form_container">

                    <form>
                        <div className="container _form">
                            <center>  <h1> Laundry Request Form</h1> </center>
                            <hr />
                            <label> Pick up / Drop date : </label>
                            <input type="date" name="date" placeholder="Pick a Date" onChange={onchange} size="15" required />
                            <label> Topwear : </label>
                            <input type="text" name="top" placeholder="shirt,top,Tshirt" size="15" onChange={onchange} required />
                            <label> Bottomwear : </label>
                            <input type="text" name="bottom" placeholder="Lower,jeans,leggins" onChange={onchange} size="15" required />
                            <label> Cloth Type : </label>
                            <input type="text" name="cloth_type" placeholder="woolen cloth / others" onChange={onchange} size="15" required />

                            <label>
                                Service Type :
                            </label>
                            <br />

                            <select name='service_type' onChange={onchange}>
                                <option value="none">None</option>
                                <option value="pickup laundry services">Pickup laundry services</option>
                                <option value="Dry cleaning">Dry cleaning</option>
                                <option value="fluff and fold laundry services">Fluff and fold laundry services</option>

                            </select>

                            <label> Phone :

                            </label>
                            <input type="text" name="contact" placeholder="Phone Number" onChange={onchange} size="2" />
                            <strong>Description (if any) :</strong> 
                            <textarea cols="80" name='description' rows="5" placeholder="message" onChange={onchange}>
                            </textarea>
                            <button type="submit" onClick={requestRegister} className="registerbtn">Register</button>

                        </div>
                    </form>
                </div>

            </div>}
            <div className="footer_div">
                <div className="footer_item">
                    <p>Copyright @ Laundry Management System 2019</p>
                </div>
            </div>
            
        </>
    )
}

export default Request