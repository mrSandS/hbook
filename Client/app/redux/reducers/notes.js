import {
	NOTES_FETCH,
	NOTES_ADD,
  NOTES_UPDATE,
  NOTES_DELETE
} from '../actions'

const initialState = {
  data: []
}

const notesReducer = (state = initialState, action) => {

  switch (action.type) {
   	case NOTES_FETCH:
			return {
				...state,
				data: action.payload
			}  	
   	case NOTES_ADD:
			return {
				...state,
				data: [
					...state.data,
					action.payload
				]
			}
    case NOTES_UPDATE:
	    return {
	    	...state,
	    	data: state.data.map(el => {
	    		if (el._id === action.payload.id) {
	    			return {
	    				...el,
	    				[action.payload.columnTitle]: action.payload.changedValue
	    			}
	    		}
	    		return el
	    	})
	    } 
    case NOTES_DELETE:
			return {
				...state,
				data: state.data.filter(el => {
					return el._id !== action.payload										
				})
			} 
    default:
      return state
  }
}

export default notesReducer;

export const fetchNotes = payload => ({
	type: NOTES_FETCH,
	payload
})
export const addNote = payload => ({
	type: NOTES_ADD,
	payload
})
export const updateNote = payload => ({
	type: NOTES_UPDATE,
	payload
})
export const deleteNote = payload => ({
	type: NOTES_DELETE,
	payload
})