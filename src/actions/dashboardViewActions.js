import axios from 'axios'
function initActions(){
	return Promise.resolve()
}
export function fetchUserData(dispatch){
	var url = "/api/user"
	axios.get(url).then((response)=>{
		dispatch({
			type: "SET_USER_DATA",
      payload: response.data
		})
	}, (err)=>{
		console.log(err)
	})
}
export function fetchStats(dispatch){
  var url = "/api/stats"
  axios.get(url).then((response)=>{
    dispatch({
      type: "SET_STATS",
      payload: response.data
    })
  })
}