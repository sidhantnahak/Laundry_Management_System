import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loder from '../Loder';
import { useAlert } from 'react-alert';
import './notification.css'

const Notification = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user, loading, error, iscreated } = useSelector(state => state.user)
    var i = 0;
    useEffect(() => {
        if (error) {
            alert.error(error)
        }

    }, [user, loading, error, iscreated, dispatch, alert])
    return (
        <>
            {loading ? <Loder /> : <>

                <div className='notification_container'>

                    {user.notification.length === undefined || user.notification.length === 0 ? <h1>You have not received any notification</h1> :
                        <>
                            <h1>Your Notifications</h1>

                            <div className="notification_table">
                                <table>
                                    <tbody>


                                        <tr>
                                            <th>SL NO.</th>
                                            <th>Date</th>

                                            <th>Message</th>
                                        </tr>

                                        {


                                            user.notification.map(function (e) {
                                                i++;




                                                return <tr key={e.message}>
                                                    <td className='price'>{i}</td>
                                                    <td>{`${e.date}`.substring(0, 10)}</td>

                                                    <td ><strong>{e.message}</strong></td>


                                                </tr>

                                            }
                                            )

                                        }

                                    </tbody>

                                </table>


                            </div>
                        </>}</div>

                <div className="footer_div">
                    <div className="footer_item">
                        <p>Copyright @ Laundry Management System 2019</p>
                    </div>
                </div>

            </>
            }
        </>
    )
}

export default Notification