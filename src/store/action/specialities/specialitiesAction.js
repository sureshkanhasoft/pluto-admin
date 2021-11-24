import axios from "axios";
import { apiClient } from "../../../config/apiClient";
import Config from '../../../config/config'
import {
    CREATE_SPECIALITIES_ERROR, CREATE_SPECIALITIES_REQUEST, CREATE_SPECIALITIES_SUCCESS,
    DELETE_SPECIALITIES_ERROR,
    DELETE_SPECIALITIES_REQUEST,
    DELETE_SPECIALITIES_SUCCESS,
    GET_SPECIALITIES_ERROR, GET_SPECIALITIES_REQUEST, GET_SPECIALITIES_SUCCESS,
    UPDATE_SPECIALITIES_ERROR, UPDATE_SPECIALITIES_REQUEST, UPDATE_SPECIALITIES_SUCCESS
} from "../actiontypes";


export const getSpecialities = ({pageNo=1, search = ''}) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getSpecialitiesRequest())
        await axios.get(`${Config.API_URL}api/organization/get-all-speciality?search=${search}&page=${pageNo}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data
            if (dataItem.status === true) {
                dispatch(getSpecialitiesSuccess(dataItem.data))
            } else {
                dispatch(getSpecialitiesSuccess(""))
                dispatch(getSpecialitiesError(dataItem.data))
            }
        }).catch(error => {
            dispatch(getSpecialitiesSuccess(""))
            dispatch(getSpecialitiesError(error))
        })
    }
}

export const getSpecialitiesRequest = () => {
    return {
        type: GET_SPECIALITIES_REQUEST
    }
}
export const getSpecialitiesSuccess = (data) => {
    return {
        type: GET_SPECIALITIES_SUCCESS,
        payload: data
    }
}
export const getSpecialitiesError = (error) => {
    return {
        type: GET_SPECIALITIES_ERROR,
        payload: error
    }
}

// -----------------------------

// export const createSpecialities = (data) => {
//     const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
//     return async (dispatch) => {
//         dispatch(createSpecialitiesRequest())
//         await axios.post(`${Config.API_URL}api/organization/add-speciality`, data, {
//             headers: {
//                 'content-type': 'application/json',
//                 'Authorization': `Bearer ${loggedInUser}`
//             }
//         }).then(response => {
//             const data = response.data
//             if (data.status === true) {
//                 dispatch(createSpecialitiesSuccess(data))
//                 setTimeout(() => {
//                     dispatch(getSpecialities(1, ''))
//                 }, 2000);
//             } else {
//                 dispatch(createSpecialitiesError(data))
//             }
//         }).catch(error => {
//             dispatch(createSpecialitiesError(error))
//         })
//     }
// }

export const createSpecialities = (data) => {
    return async (dispatch) => {
        dispatch(createSpecialitiesRequest())
        await apiClient(true).post(`api/organization/add-speciality`,data)
        .then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(createSpecialitiesSuccess(data))
                setTimeout(() => {
                    dispatch(getSpecialities(1, ''))
                }, 2000);
            } else {
                dispatch(createSpecialitiesError(data))
            }
        }).catch(error => {
            dispatch(createSpecialitiesError(error))
        })
    }
}

export const createSpecialitiesRequest = () => {
    return {
        type: CREATE_SPECIALITIES_REQUEST
    }
}
export const createSpecialitiesSuccess = (data) => {
    return {
        type: CREATE_SPECIALITIES_SUCCESS,
        payload: data
    }
}
export const createSpecialitiesError = (error) => {
    return {
        type: CREATE_SPECIALITIES_ERROR,
        payload: error
    }
}

// -----------------------------------

export const updateSpecialities = (data) => {
    const { id, speciality_name } = data;
    const data1 = {
        speciality_id: id,
        speciality_name
    }
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(updateSpecialitiesRequest())
        await axios.post(`${Config.API_URL}api/organization/edit-speciality`, data1, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(updateSpecialitiesSuccess(data))
                dispatch(getSpecialities(1, ''))
            } else {
                dispatch(updateSpecialitiesError(data))
            }
        }).catch(error => {
            dispatch(updateSpecialitiesError(error))
        })
    }
}

export const updateSpecialitiesRequest = () => {
    return {
        type: UPDATE_SPECIALITIES_REQUEST
    }
}
export const updateSpecialitiesSuccess = (data) => {
    return {
        type: UPDATE_SPECIALITIES_SUCCESS,
        payload: data
    }
}
export const updateSpecialitiesError = (error) => {
    return {
        type: UPDATE_SPECIALITIES_ERROR,
        payload: error
    }
}


// -------------------------------------

export const deleteSpecialities = (role_id) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(deleteSpecialitiesRequest())
        await axios.delete(`${Config.API_URL}api/organization/delete-speciality/${role_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(deleteSpecialitiesSuccess(data))
                setTimeout(() => {
                    dispatch(getSpecialities(1,''))
                }, 2000);
            } else {
                dispatch(deleteSpecialitiesError(data))
            }
        }).catch(error => {
            dispatch(deleteSpecialitiesError(error))
        })
    }
}

export const deleteSpecialitiesRequest = () => {
    return {
        type: DELETE_SPECIALITIES_REQUEST
    }
}
export const deleteSpecialitiesSuccess = (data) => {
    return {
        type: DELETE_SPECIALITIES_SUCCESS,
        payload:data
    }
}
export const deleteSpecialitiesError = (error) => {
    return {
        type: DELETE_SPECIALITIES_ERROR,
        payload:error
    }
}