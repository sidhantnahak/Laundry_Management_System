
import {
    update_profile_fail,
    update_profile_request,
    update_profile_sucess,
    update_password_fail,
    update_password_request,
    update_password_sucess,
    forget_password_fail,
    forget_password_request,
    forget_password_sucess,
    getuser_fail,
    getuser_request,
     getuser_sucess,
     login_fail,
      login_request,
       login_sucess,
       logout_fail,
       logout_request,
       logout_sucess,
       register_fail,
      register_request,
       register_sucess,
    //    update_fail,
    //    update_request,
    //    update_sucess,
       clear_errors,
       otp_request,
       otp_fail,
       otp_sucess,
       reset_password_request,
       reset_password_sucess,
       reset_password_fail,
     } from "../Constants/Constants";
import axios from 'axios'


axios.create({
    baseURL:'http://localhost:4000',
    withCredentials:true
})



export const register = (name,email,phone, password) => async (dispatch) => {
    try {

        dispatch({ type: register_request });
        // const config = { headers: {"Content-Type": "application/json"}};
        const { data } = await axios.post('/api/v1/register',
            {name, email,phone, password}
        );

        dispatch({ type: register_sucess, payload: data.user });

    } catch (error) {
       
        dispatch({ type: register_fail, payload: error.response.data.message })

    }
}

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: login_request });
        const config = { headers: {"Content-Type": "application/json"}};
        const { data } = await axios.post('/api/v1/login',
            { email, password },
            config
        );


        dispatch({ type: login_sucess, payload: data.user });

    } catch (error) {
        dispatch({ type: login_fail, payload: error.response.data.message })

    }

}


export const Logout=()=>async(dispatch)=>{
    try {
        dispatch({ type: logout_request });
        
        const { data } = await axios.get('/api/v1/logout')
        dispatch({ type: logout_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: logout_fail,payload:error.response.data.message });
        
    }

}

export const getUser=()=>async(dispatch)=>{
    try {
        dispatch({ type: getuser_request });
        
        const { data } = await axios.post('/api/v1/me')
        dispatch({ type: getuser_sucess,payload:data.user});

    } catch (error) {
        dispatch({ type: getuser_fail,payload:error.response.data.message });
        
    }
}

export const updateprofile=(name,phone)=>async(dispatch)=>{
    try {
        dispatch({ type:update_profile_request  });
        const config = { headers: {"Content-Type": "application/json"}};
        
        const { data } = await axios.put('/api/v1/me/update',
        {name,phone},config
        )
        dispatch({ type: update_profile_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: update_profile_fail, payload:error.response.data.message });
        
    }
}

export const updatepassword=(oldPassword,newPassword,confirmPassword)=>async(dispatch)=>{
    try {
        dispatch({ type:update_password_request  });
        const config = { headers: {"Content-Type": "application/json"}};
        
        const { data } = await axios.put('/api/v1/password/update',
        {oldPassword,newPassword,confirmPassword},config
        )
        dispatch({ type: update_password_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: update_password_fail, payload:error.response.data.message });
        
    }
}

export const forgotpassword=(email)=>async(dispatch)=>{
    try {
        dispatch({ type:forget_password_request  });
        const config = { headers: {"Content-Type": "application/json"}};
        
        const { data } = await axios.post('/api/v1/password/forgot',
        {email},config
        )
        dispatch({ type: forget_password_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: forget_password_fail, payload:error.response.data.message });
        
    }
}

export const otpverify=(otp)=>async(dispatch)=>{
    try {
        dispatch({ type:otp_request  });
        const config = { headers: {"Content-Type": "application/json"}};
        
        const { data } = await axios.put('/api/v1/password/reset/otp',
        {otp},config
        )
        dispatch({ type: otp_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type: otp_fail, payload:error.response.data.message });
        
    }
}


export const resetPassword=(password,confirmPassword)=>async(dispatch)=>{
    try {
        dispatch({ type:reset_password_request  });
        const config = { headers: {"Content-Type": "application/json"}};
        
        const { data } = await axios.put('/api/v1/password/reset',
        {password,confirmPassword},config
        )
        dispatch({ type: reset_password_sucess,payload:data.sucess});

    } catch (error) {
        dispatch({ type:reset_password_fail, payload:error.response.data.message });
        
    }
}

// export const deletenote=(id)=>async(dispatch)=>{
//     try {
//         dispatch({ type:deletenote_request  });
        
//         const { data } = await axios.delete(`/api/v1/deletenote/${id}`)
//         dispatch({ type: deletenote_sucess,payload:data.sucess});

//     } catch (error) {
//         dispatch({ type: deletenote_fail,payload:error.response.data.message });
        
//     }
// }

// export const addnote=(title,description)=>async(dispatch)=>{
//     try {

//         dispatch({ type:addnote_request  });
//         const config = { headers: {"Content-Type": "application/json"}};
        
//         const { data } = await axios.post(`/api/v1/createnote`,
//         {title,description},config
//         )
//         dispatch({ type: addnote_sucess,payload:data.notes});

//     } catch (error) {
//         dispatch({ type: addnote_fail,payload:error.response.data.message });
        
//     }
// }

// export const updatenote=(id,title,description)=>async(dispatch)=>{
//     try {

//         dispatch({ type:update_request  });
//         const config = { headers: {"Content-Type": "application/json"}};
        
//         const { data } = await axios.put(`/api/v1/updatenote/${id}`,
//         {title,description},config
//         )
//         dispatch({ type:update_sucess,payload:data.notes});

//     } catch (error) {
//         dispatch({ type: update_fail,payload:error.response.data.message });
        
//     }
// }


export const clearErrors = () => async (dispatch) => {
    dispatch({ type:clear_errors });
  };