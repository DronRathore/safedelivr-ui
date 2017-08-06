// mail reducer
import {createReducer} from './createReducer'
const initialData = {}

export default createReducer(initialData, {
	"SET_MAIL_STATUS": (state, payload)=>{
		return Object.assign({}, state, payload)
	}
})