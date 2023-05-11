import React, { useEffect } from 'react'
import './status.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { clearErrors, delete_laundry_request, getall_laundries } from '../../UserAction/LaundryAction';
import { useNavigate } from 'react-router-dom';
import Loder from '../Loder';

const Status = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { laundries, loading, error, iscreated } = useSelector(state => state.laundries)

    useEffect(() => {
        if (error) {
            alert.success(error);
            dispatch(clearErrors());

        }
        if (iscreated) {
            alert.success("Request Deleted sucessfully")
            dispatch(getall_laundries())
            navigate('/dashboard/status')
        }


    }, [laundries, loading, error, iscreated, dispatch, navigate, alert])

    return (
        <>
            {loading ? <Loder /> :

                <div className='status_container'>
                    {laundries.length === undefined || laundries.length === 0 ? <h1> No Request Found </h1> : <>
                        <h1>Your Laundry Request Status</h1>

                        <div className="table_container1">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Status</th>
                                        <th>Request Date</th>

                                        <th>Pick Date</th>
                                        <th> Delete</th>
                                    </tr>

                                    {

                                        laundries.map(e =>




                                            <tr key={e._id}>
                                                <td className='price'>{e._id}</td>

                                                {e.status === "Finished" && <td style={{ color: "green", font: "bold" }}><strong>{e.status}</strong> </td>}
                                                {e.status === "Inprogress" && <td style={{ color: "blue" }}><strong>{e.status}</strong></td>}
                                                {e.status === "Accepted" && <td style={{ color: "red" }}><strong>{e.status}</strong></td>}
                                                {e.status === "Requested" && <td ><strong>{e.status}</strong></td>}

                                                <td>{`${e.request_date}`.substr(0, 10)}</td>
                                                <td>{`${e.required_date}`.substr(0, 10)}</td>
                                                <td> <i onClick={() => {dispatch(delete_laundry_request(e._id))}} className="fa-solid fa-trash"></i></td>

                                            </tr>
                                        )

                                    }

                                </tbody>

                            </table>


                        </div>
                    </>}</div>



            }


            <div className="footer_div">
                <div className="footer_item">
                    <p>Copyright @ Laundry Management System 2019</p>
                </div>
            </div>
        </>
    )
}

export default Status