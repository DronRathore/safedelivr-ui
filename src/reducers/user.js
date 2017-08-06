import {createReducer} from './createReducer'
const initialData = {}

export default createReducer(initialData, {
	"SET_USER_DATA": (state, payload)=>{
		console.log("Resetting", payload)
		return Object.assign({}, state, payload)
	}
})