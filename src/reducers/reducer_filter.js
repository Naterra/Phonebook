import { SET_FILTER_TERM } from '../actions/types';


//paging state ?
const paging = {
    page:0,
    limit: 20,
    total:12000
}



const initialState ={
    type:'alpha',
    term: 'A',
    limit: 5,
    page: 0
};

export default function (state=initialState, action){
    switch(action.type){
        case SET_FILTER_TERM:
            // console.log('SET_FILTER_TERM reducer', action);
            // console.log('NEW STATE', {...state, term:action.payload.term  } );

            return {...state,
                term:action.payload.term,
                type:action.payload.type
            };
            //case SET_FILTER_TYPE:
            //case SET_FILTER_LIMIT:
        default:
            return state;
    }
}


// const visibilityFilter = (state = 'SHOW_ALL', action) => {
//     switch (action.type) {
//         case 'SET_VISIBILITY_FILTER':
//             return action.filter
//         default:
//             return state
//     }
// }
//
// export default visibilityFilter