import axios from "axios"
// import config from "../config"

export function initActions(){
	return (dispatch, getState)=>{
		return new Promise((resolve, reject)=>{
			const state = getState()
			axios.get("/api/v1/getSysState").then((data)=>{
				dispatch({
					'type': 'SET_STATE',
					payload: data
				})
				resolve(data)
			}).catch((err)=>{
				dispatch({
					'type': 'SET_STATE',
					payload: {error: true}
				})
				reject(err)
			})
		})
	}
}
export default {
	initActions
}