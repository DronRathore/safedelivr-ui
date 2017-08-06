// batchViewActions
import axios from 'axios'

export function fetchBatches(dispatch){
	var url = "/api/batches"
	axios.get(url).then((response)=>{
		dispatch({
			type: "SET_BATCHES",
  		payload: {list: response.data}
		})
	}, (err)=>{
		console.log(err)
	})
}

export function fetchLogs(dispatch, id){
  var url = "/api/batch/"+ id + "/logs"
  axios.get(url).then((response)=>{
    dispatch({
      type: "SET_LOGS",
      payload: {logs: response.data}
    })
  }, (err)=>{
    console.log(err)
  })
}
