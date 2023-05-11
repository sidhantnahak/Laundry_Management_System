import {
    login_fail, login_sucess, login_request, register_fail,
    register_request,
    register_sucess,
    getuser_request,
    getuser_sucess,
    getuser_fail,

    logout_fail,
    logout_sucess,
    clear_errors,
    update_profile_request,
    update_profile_sucess,
    update_profile_fail,
    update_profile_reset,
    update_password_request,
    update_password_sucess,
    update_password_fail,
    update_password_reset,
    forget_password_request,
    forget_password_sucess,
    forget_password_reset,
    otp_request,
    otp_sucess,
    otp_fail,
    otp_reset,
    reset_password_request,
    reset_password_sucess,
    reset_password_fail,
    reset_password_reset,
    logout_request,
    login_reset,
    register_reset,
    // allnotes_request,
    // allnotes_sucess,
    // allnotes_fail,
    // deletenote_request,
    // deletenote_sucess,
    // deletenote_fail,
    // addnote_request,
    // addnote_sucess,
    // addnote_fail,
    // update_request,
    // update_sucess,
    // update_fail
} from '../Constants/Constants'

export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case login_request:
        case register_request:
        case getuser_request:
            case logout_request:

            return {
                loading: true,
                isAuthenticated: false
            }
        case login_sucess:
        case register_sucess:
        case getuser_sucess:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                sucess: true,
            }

        case logout_sucess:
            return {
                user: null,
                loading: false,
                isAuthenticated: false,
                sucess: true
            }

            case login_reset:
                case register_reset:
                return{
                    ...state,
                    sucess:false
                }
        case login_fail:
        case register_fail:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case getuser_fail:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case logout_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case clear_errors:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}


export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case update_profile_request:
        case update_password_request:
        case forget_password_request:
        case otp_request:
        case reset_password_request:
            return {
                ...state,
                loading: true,
            };
        case update_profile_sucess:
        case update_password_sucess:
        case forget_password_sucess:
        case otp_sucess:
        case reset_password_sucess:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };


        case update_profile_fail:
        case update_password_fail:
        case otp_fail:
        case reset_password_fail:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case update_profile_reset:
        case update_password_reset:
        case forget_password_reset:
        case otp_reset:
        case reset_password_reset:
            return {
                ...state,
                isUpdated: false
            }
        case clear_errors:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

// export const noteReducer = (state = { notes: {} }, action) => {

//     switch (action.type) {
//         case allnotes_request:
//         case deletenote_request:
//         case addnote_request:
//             case update_request:
//             return {
//                 loading: true,
//                 sucess:false
//             }
//         case allnotes_sucess:
//             return {
//                 ...state,
//                 loading: false,
//                 notes: action.payload,
//             }
//         case deletenote_sucess:
//             case update_sucess:
//             return {
//                 ...state,
//                 loading: false,
//                 sucess: true

//             }
//         case addnote_sucess:
//             return {
//                 ...state,
//                 loading: false,
//                 notes:action.payload,
//                 sucess:true
//             }
//         case allnotes_fail:
//             return {
//                 ...state,
//                 loading: false,
//                 notes: null,
//                 error: action.payload
//             }
//         case deletenote_fail:
//             case update_fail:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//                 sucess:false
//             }
//         case addnote_fail:
//             return {
//                 ...state,
//                 loading: false,
//                 notes:null,
//                 error: action.payload,
//                 sucess:false
//             }
//         default:
//             return state;
//     }
// }