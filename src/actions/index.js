import axios from 'axios';
// axios.defaults.baseURL = 'http://phonebook.app/new_phonebook/';
axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import { DELETE_CONTACT, RESET_PAGER, RESET_FILTER, SET_FILTER_TERM, SET_FILTER_PAGE, FETCH_CONTACTS, FETCH_CONTACT,  SAVE_CONTACT} from './types';



export function delete_contact(id){
    const request = axios.post(`/api/index.php?action=delete_contact`, {id:id} );

    return{
        type:DELETE_CONTACT,
        id
    }
}

export function reset_pager(){
    return{
        type: RESET_PAGER,
        payload: null
    };
}

export function reset_filter(){
    return{
        type: RESET_FILTER,
        payload: {}
    };
}
export function set_filter_page(term){
    return{
        type: SET_FILTER_PAGE,
        payload: term
    };
}

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

    const request = axios.get(`/api/index.php?action=get_contacts&limit=${filter.limit}&filterBy=${filter.term}&page=${filter.page}`, config );


    return{
        type: FETCH_CONTACTS,
        payload: request
    };
}


// export const fetchContacts = () =>async dispatch => {
//     const res = await axios.get('/api/index.php?action=contacts');
//     dispatch({ type:FETCH_CONTACTS, payload: res.data });
// };