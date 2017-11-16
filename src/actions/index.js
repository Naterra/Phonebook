import axios from 'axios';
//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = 'http://phonebook.app/new_phonebook/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import { FETCH_CONTACTS, FETCH_CONTACT,  EDIT_CONTACT} from './types';

const records_limit = 30;

export function editContact(values, callback){
    // const request = axios.post(`/api/index.php?action=edit_contact`, values )
    //     .then(() => callback());
const request = '';
    return{
        type: EDIT_CONTACT,
        payload: request
    };
}


export function fetchContact(id){
    const request = axios.get(`/api/index.php?action=get_contact&id=${id}`);
    return{
        type: FETCH_CONTACT,
        payload: request
    };
}

export function fetchContacts(){
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const request = axios.get(`/api/index.php?action=contacts&limit=${records_limit}`, config);
    // .then(function(response){
    //     console.log('response',response);
    // }).catch(function (error) {
    //     console.log('error', error);
    // });

    console.log('action request',request);

    return{
        type: FETCH_CONTACTS,
        payload: request
    };
}


// export const fetchContacts = () =>async dispatch => {
//     const res = await axios.get('/api/index.php?action=contacts');
//     dispatch({ type:FETCH_CONTACTS, payload: res.data });
// };