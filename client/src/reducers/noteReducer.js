import {v4 as uuid} from 'uuid';
import {GET_NOTE, ADD_NOTE, DELETE_NOTE, NOTES_LOADING} from '../actions/types';
const initialState = {
    notes:[],
    loading:false,

};

export default function(state= initialState, action) {
    switch(action.type){
        case GET_NOTE:
            return{
                ...state,
                notes: action.payload,
                loading:false
            };
        case ADD_NOTE:
            return{
                ...state,
                notes: [action.payload, ...state.notes],                
            };
        case DELETE_NOTE:
            return{
                ...state,
                notes: state.notes.filter(notes => notes._id !== action.payload) 
            };
        case NOTES_LOADING:
            return{
                ...state,
                loading: true
            };
        default:
            return state;
    }
}