import { combineReducers } from 'redux';

const initialState = {
    display:false,
}
const modalReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'modal/hide':
            return {
                ...state,
                display:false
            }
        case 'modal/show':
            return {
                display:true,
                type:action.payload
        }
        default:
            return state;
    }
}
const cardsReducer = (state = [], action)=> {
    switch(action.type){
        case 'cards/update':
            return action.payload;
        default:
            return state;
    }
}
const selectedReducer = (state = 0, action)=> {
    switch(action.type){
        case 'selected/update':
            return action.payload;
        default:
            return state;
    }
}
const receiptsReducer = (state =[], action)=> {
    switch(action.type){
        case 'receipts/update':
            return action.payload;
        default:
            return state;
    }
}
const transactionsReducer = (state =[], action)=> {
    switch(action.type){
        case 'transactions/update':
            return action.payload;
        default:
            return state;
    }
}
const errorsReducer = (state = {state:false, status:200, message:null}, action)=> {
    switch(action.type){
        case 'errors/update':
            return action.payload;
        default:
            return state;
    }
}

const startPeriodReducer = (state = '', action)=> {
    switch(action.type){
        case 'startPeriod/update':
            return action.payload;
        default:
            return state;
    }
}
const endPeriodReducer = (state = '', action)=> {
    switch(action.type){
        case 'endPeriod/update':
            return action.payload;
        default:
            return state;
    }
}
const cardReducer = (state = {}, action)=> {
    switch(action.type){
        case 'card/update':
            return action.payload;
        default:
            return state;
    }
}
const pathnameReducer = (state = window.location.pathname, action)=> {
    switch(action.type){
        case 'pathname/update':
            return action.payload;
        default:
            return state;
    }
}
const Reducers = combineReducers({
    modal:modalReducer,
    cards:cardsReducer,
    errors:errorsReducer,
    receipts:receiptsReducer,
    transactions:transactionsReducer,
    selected:selectedReducer,
    card:cardReducer,
    startPeriod:startPeriodReducer,
    endPeriod:endPeriodReducer,
    pathname:pathnameReducer
});

export default Reducers;