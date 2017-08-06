// stats.js
import {createReducer} from './createReducer'
const initialData = {
	data: [
  {success: 0, date: "Monday", failed: 0, queued: 0},
  {success: 0, date: "Tuesday", failed: 0, queued: 0},
  {success: 0, date: "Wednesday", failed: 0, queued: 0},
  {success: 0, date: "Thursday", failed: 0, queued: 0},
  {success: 0, date: "Friday", failed: 0, queued: 0},
  {success: 0, date: "Saturday", failed: 0, queued: 0},
  {success: 0, date: "Sunday", failed: 0, queued: 0}
  ]
}

export default createReducer(initialData, {
	"SET_STATS": (state, payload)=>{
    let data = payload.map((stat)=>{
      const parts = (new Date(stat.date)).toString().split(" ")
      stat.date = parts[0] + " " + parts.splice(1, 3).join("-")
      return stat
    })
		return Object.assign({}, state, {data:data})
	}
})