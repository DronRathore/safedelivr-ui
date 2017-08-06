import {createReducer} from './createReducer'
const initialData = {}

export default createReducer(initialData, {
	"ROUTE_CHANGE": (state, payload)=>{
		return Object.assign({}, state, {
			route: payload
		})
	},
	"ROUTER_PARAMS": (state, payload)=>{
		return Object.assign({}, state, {
			params: payload
		})	
	}
})