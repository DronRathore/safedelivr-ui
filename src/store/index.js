// Store initialiser
import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

export function getStore(initialState = {}){
	const thunkedMiddleware = applyMiddleware(thunk)
	const store = thunkedMiddleware(createStore)(reducers, initialState)
	return store
}