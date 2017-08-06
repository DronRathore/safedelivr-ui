// reducers
import {combineReducers} from 'redux'
import {createReducer} from './createReducer'
// import home from "./home"
import route from "./route"
import user from "./user"
import batches from "./batches"
import mail from "./mail"

export default combineReducers({
	route,
  // home,
  user,
  batches,
  mail
})