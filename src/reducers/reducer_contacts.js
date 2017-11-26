const FETCH_CONTACTS = 'fetch_contacts';
const FETCH_CONTACT  = 'fetch_contact';

const INITIAL_STATE = {
    contacts:[],
    total:0
};

export default function (state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_CONTACTS:
            //console.log('reducer return ', action.payload.data);
            return action.payload.data  ;
        default:
            return state;
    }
}