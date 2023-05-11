import React, { useEffect } from 'react'
import './dashboard.css'
import { useSelector } from 'react-redux'
import Loder from '../Loder'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const { laundries, loading } = useSelector(state => state.laundries)
    const navigate = useNavigate()

    let request = 0, process = 0, accept = 0, finish = 0;

    if (laundries) {


        laundries.forEach(element => {

            if (element.status === "Requested") request++;
            else if (element.status === "Inprogress") process++;
            else if (element.status === "Accepted") accept++;
            else finish++;
        });
    }

    const handler1 = () => {
        navigate("/dashboard/laundry/request")
    }
    const handler4 = () => {
        navigate("/dashboard/laundry/finish")
    }

    const handler3 = () => {
        navigate("/dashboard/laundry/inprogress")
    }
    const handler2 = () => {
        navigate("/dashboard/laundry/accepted")
    }

useEffect(() => {
  
}, [loading,laundries,navigate])

    return (
        <>
            {loading ? <Loder /> :

                <div className="dashboard_container">

                    <div className="detail_container">

                        <div className="items_container">
                            <div className="item" style={{ background: "rgb(237, 237, 40)" }}>
                                <div className="items1">{request} New request</div>
                                <div onClick={handler1} className="items1"><p>view Details</p><i className="fa-solid fa-chevron-right"></i></div>
                            </div>
                            <div className="item" style={{ background: "rgb(60, 281,132)" }}>
                                <div className="items1" style={{ alignItems: "start" }}>{accept} Accepted!</div>
                                <div className="items1" onClick={handler2}><p>View Details</p><i className="fa-solid fa-chevron-right"></i></div>
                            </div>
                            <div className="item" style={{ background: "rgb(91, 211, 238)" }}>
                                <div className="items1">{process} Inprogress!</div>
                                <div className="items1" onClick={handler3}><p>View Details</p><i className="fa-solid fa-chevron-right"></i></div>
                            </div>
                            <div className="item" style={{ background: "rgb(230, 94, 94)" }}>

                                <div className="items1">{finish} Finish!</div>
                                <div onClick={handler4} className="items1"><p>View Details</p><i className="fa-solid fa-chevron-right"></i></div>
                            </div>
                        </div>
                        <h1>Laundry Price ( Per Unit )</h1>

                        <div className="table_container">
                            <table>
                                <tbody>


                                    <tr>
                                        <td className='price'>Top Wear Laundry Price</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td className='price'>Bottom Wear Laundry Price</td>
                                        <td>22</td>
                                    </tr>
                                    <tr>
                                        <td className='price'>Woolen Cloth Laundry Price</td>
                                        <td>20</td>
                                    </tr>
                                    <tr>
                                        <td className='price'>Other Price</td>
                                        <td>Other price depend upon cloth variety(other than above three category)</td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>



                    </div>

                </div>
            }
            <div className="footer_div">
                <div className="footer_item">
                    <p>Copyright @ Laundry Management System 2019</p>
                </div>
            </div>


        </>
    )
}

export default Dashboard