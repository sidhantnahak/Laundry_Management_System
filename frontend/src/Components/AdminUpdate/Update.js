import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { admin_delete_laundry_request, admin_getall_laundries, admin_update_laundry, clearErrors } from '../../UserAction/LaundryAction';
import { useNavigate, useParams } from 'react-router-dom';
import Loder from '../Loder';
import './update.css'
import { admin_laundry_delete_reset, admin_laundry_update_reset } from '../../Constants/Constants';

const Update = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const alert = useAlert();
  const navigate = useNavigate()
  const [status, setStatus] = useState("")

  const { requests, loading, error, isDeleted,isUpdated } = useSelector(state => state.admin)


  var modal = document.getElementById("myModal");

  var span = document.getElementsByClassName("close")[0];



  window.onclick = function (event) {
    modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  const closehandler = () => {
    modal = document.getElementById("myModal");
    modal.style.display = "none";
    navigate('/dashboard/request/update')
  }


  const update = () => {
    modal.style.display = "none";

    const id = params.id
    console.log(status, id)
    dispatch(admin_update_laundry(id, status))


  }

  useEffect(() => {
    if (error) {
      alert.success(error);
      dispatch(clearErrors());


    }
    if (isUpdated) {
      alert.success("request updated sucessfully")
      dispatch(admin_getall_laundries())
      navigate("/dashboard/request/update")
      dispatch({type:admin_laundry_update_reset})
    }
    if (isDeleted) {
      alert.success("request deleted sucessfully")
      dispatch(admin_getall_laundries())
      navigate("/dashboard/request/update")
      dispatch({type:admin_laundry_delete_reset})
      
    }
    


  }, [requests, loading, error, isUpdated,isDeleted, dispatch, navigate, alert])

  return (
    <>
      {loading ? <Loder /> :

        <div className='status_container'>
          <h1>All Laundry Request Status</h1>

          <div className="table_container1">
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Request Date</th>

                  <th>Pick Date</th>
                  <th>Edit / Delete</th>
                </tr>

                {requests &&

                  requests.map(e =>

                    <tr key={e._id}>
                      <td className='price'>{e._id}</td>

                      {e.status === "Finished" && <td style={{ color: "green", font: "bold" }}><strong>{e.status}</strong> </td>}
                      {e.status === "Inprogress" && <td style={{ color: "blue" }}><strong>{e.status}</strong></td>}
                      {e.status === "Accepted" && <td style={{ color: "red" }}><strong>{e.status}</strong></td>}
                      {e.status === "Requested" && <td ><strong>{e.status}</strong></td>}

                      <td>{`${e.request_date}`.substr(0, 10)}</td>
                      <td>{`${e.required_date}`.substr(0, 10)}</td>
                      <td><i onClick={() => {


                        navigate(`/dashboard/request/update/${e._id}`)
                        modal = document.getElementById("myModal");
                        modal.style.display = "block";




                      }} className="fa-solid fa-file-pen"></i> <i onClick={() => { dispatch(admin_delete_laundry_request(e._id)) }} className="fa-solid fa-trash"></i></td>

                    </tr>
                  )

                }

              </tbody>

            </table>


          </div>
        </div>



      }

      <div id="myModal" className="modal">

        <div className="modal-content">

          <span onClick={closehandler} className="close">&times;</span>
          <h3>Change Request Status</h3>
          <div className="modal_detail">


            <select name='request_update' onChange={(e) => setStatus(e.target.value)}>
              <option>None</option>
              <option value="Accepted">Accepted</option>
              <option value="Inprogress">Inprogress</option>
              <option value="Finished">Finished</option>

            </select>
          </div>
          <div>

            <button onClick={() => modal.style.display = "none"}>Back</button>
            <button onClick={update}>Save</button>
          </div>
        </div>


      </div>

      <div className="footer_div">
        <div className="footer_item">
          <p>Copyright @ Laundry Management System 2019</p>
        </div>
      </div>
    </>
  )
}

export default Update