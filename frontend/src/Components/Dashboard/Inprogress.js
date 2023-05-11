import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loder from '../Loder';
import { useAlert } from 'react-alert';

const Inprogress = () => {
    const alert = useAlert()

    const { laundries, loading, error, iscreated } = useSelector(state => state.laundries)

    let process = 0;
    laundries.forEach(element => {

        if (element.status === "Inprogress") process++;
    });

    useEffect(() => {

        if (error) {
            alert.error(error)
        }

    }, [laundries, loading, error, iscreated,alert])
    return (
        <>
            {loading ? <Loder /> :

                <div className='status_container'>
                    {
                        process === undefined || process === 0 ? <h1>No Request Found</h1> :
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
                                </tr>

                                {

                                    laundries.map(function (e) {

                                        if (e.status === "Inprogress") {


                                           return  <tr key={e._id}>
                                                <td className='price'>{e._id}</td>

                                                <td style={{ color: "green" }} ><strong>{e.status}</strong></td>

                                                <td>{`${e.request_date}`.substr(0, 10)}</td>
                                                <td>{`${e.required_date}`.substr(0, 10)}</td>

                                            </tr>
                                        }



                                    }
                                    )

                                }

</tbody>

                            </table>


                        </div></>}
                </div>
            }
        </>
    )
}

export default Inprogress