import { FETCH_CONTACTS, DELETE_CONTACT } from '../actions/types';


const INITIAL_STATE = {
    data:[],
    total:0
};

export default function (state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_CONTACTS:
            return action.payload.data  ;
        case DELETE_CONTACT:
            return {
                ...state,
                data: state.data.filter(contact =>
                contact.Id !== action.id  )
            };
        default:
            return state;
    }
}