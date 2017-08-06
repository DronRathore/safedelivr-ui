import {createReducer} from './createReducer'
const initialData = {}

export default createReducer(initialData, {
	"SET_BATCHES": (state, payload)=>{
		return Object.assign({}, state, payload)
	},
  "SHOW_BATCH": (state, payload)=>{
    var selected
    if (state.list && state.list.length) {
      selected = state.list.filter((b)=>(b.batch_id == payload))[0]
    } else {
      selected = {batch_id: payload}
    }
    return Object.assign({}, state, {selected: selected})
  },
  "SET_LOGS": (state, payload)=>{
    return Object.assign({}, state, payload)
  },
  "UNSET_BATCH": (state, payload)=>{
    return Object.assign({}, state, {selected: undefined})
  }
})