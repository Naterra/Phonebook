import axios from 'axios';
//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = 'http://phonebook.app/new_phonebook/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import { SET_FILTER_TERM, FETCH_CONTACTS, FETCH_CONTACT,  SAVE_CONTACT} from './types';



export function set_filter_term(term){
    return{
        type: SET_FILTER_TERM,
        payload: term
    };
}


export function saveContact(values, callback){
    const request = axios.post(`/api/index.php?action=save_contact`, values )
        .then(() => callback());


    return{
        type: SAVE_CONTACT,
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

export function fetchContacts(filter){
    console.log( filter, 'ACTION fetchContacts');
    //const records_limit = 30;

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const request = axios.get(`/api/index.php?action=contacts&limit=${filter.limit}&filterBy=${filter.term}`, config );
    // .then(function(response){
    //     console.log('response',response);
    // }).catch(function (error) {
    //     console.log('error', error);
    // });


    //console.log('action request',request);

    return{
        type: FETCH_CONTACTS,
        payload: request
    };
}


// export const fetchContacts = () =>async dispatch => {
//     const res = await axios.get('/api/index.php?action=contacts');
//     dispatch({ type:FETCH_CONTACTS, payload: res.data });
// };