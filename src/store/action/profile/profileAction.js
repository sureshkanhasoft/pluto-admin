import axios from "axios";
import Config from '../../../config/config'

export const getProfile = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    console.log('loggedInUser: ', loggedInUser);
    return async (dispatch) =>{
        // dispatch(getOrganizationRequest())
        await axios.get(`${Config.API_URL}api/superadmin/get-detail`,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(res => {
            console.log('res: ', res);
        }).catch(error => {
            console.log('error: ', error);

        })
    }
}