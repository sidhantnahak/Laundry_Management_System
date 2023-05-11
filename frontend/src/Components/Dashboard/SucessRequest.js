import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loder from '../Loder';
import { delete_laundry_request, getall_laundries } from '../../UserAction/LaundryAction';
import { useAlert } from 'react-alert';

const SucessRequest = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { laundries, loading, error, iscreated } = useSelector(state => state.laundries)
    let sucess = 0;
    laundries.forEach(element => {

        if (element.status === "Finished") sucess++;
    });
    useEffect(() => {
        if (iscreated) {
            alert.success("Deleted sucessfully")
            dispatch(getall_laundries())
        }
        if (error) {
            alert.error(error)
        }

    }, [laundries, loading, error, iscreated, dispatch, alert])
    return (
        <>
            {loading ? <Loder /> :

                <div className='status_container'>

                    {sucess === undefined || sucess === 0 ? <h1>No Request Found</h1> :
                        <>
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

                                            laundries.map(function (e) {

                                                if (e.status === "Finished") {


                                                    return <tr key={e._id}>
                                                        <td className='price'>{e._id}</td>

                                                        <td style={{ color: "green" }} ><strong>{e.status}</strong></td>

                                                        <td>{`${e.request_date}`.substr(0, 10)}</td>
                                                        <td>{`${e.required_date}`.substr(0, 10)}</td>
                                                        <td> <i onClick={() => { dispatch(delete_laundry_request(e._id)) }} className="fa-solid fa-trash"></i></td>

                                                    </tr>
                                                }



                                            }
                                            )

                                        }

                                    </tbody>

                                </table>


                            </div>
                        </>}</div>
            }
        </>
    )
}

export default SucessRequest