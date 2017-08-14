import {createReducer} from './createReducer'
const initialData = {}

export default createReducer(initialData, {
	"SET_USER_DATA": (state, payload)=>{
		return Object.assign({}, state, payload)
	}
})