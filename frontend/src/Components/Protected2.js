import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const Protected2 = ({isAdmin}) => {

    // const location = useLocation()
    // const navigate = useNavigate()
    const { user } = useSelector(state => state.user);
    useEffect(() => {

    }, [user])

    if (user &&(user.role==="admin" && isAdmin)) {
      return <Outlet/>

    }
    return <Navigate to='/' />


  
   
}

export default Protected2