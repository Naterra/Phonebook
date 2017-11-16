const FETCH_CONTACTS = 'fetch_contacts';
const FETCH_CONTACT  = 'fetch_contact';

const INITIAL_STATE = {all:[], posts:null };

export default function (state=[], action){
    switch(action.type){
        case FETCH_CONTACTS:
            //console.log('reducer return ', action.payload.data);
            return action.payload.data  ;
        default:
            return state;
    }
}