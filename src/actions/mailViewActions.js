// mailViewActions
import axios from 'axios'
import qs from 'querystring'

export function sendMail(dispatch, options){
	var url = "/api/batch"
	var data = qs.stringify(options)
	axios.post(url, data).then((response)=>{
		dispatch({
			type: "SET_MAIL_STATUS",
  		payload: response.data
		})
	}, (err)=>{
    dispatch({
      type: "SET_MAIL_STATUS",
      payload: {status: "Failed! Check Inputs"}
    })
		console.log(err)
	})
}
