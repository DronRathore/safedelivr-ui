/*
  Main client App file
*/
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import match from 'react-router/lib/match'
import Route from 'react-router/lib/Router'
import history from "react-router/lib/browserHistory"
// import PopupCard from './views/popupView'
import HeaderView from './views/HeaderView'
import {Router} from './router'
import {getStore} from './store'

require('styles/core.scss')

const target = document.getElementById("app-container")
const header = document.getElementById("app-header")
const popup = document.getElementById("popup-overlay")
const store = getStore(InitState || {})
const routes = (new Router()).router()

match({routes, history}, (error, redirectURL, renderProps)=>{
  var actions = [], components = [];
  renderProps.components.forEach((c)=>{
    return c ? actions[actions.length] = c.action : undefined;
  })
  var props = Object.assign({}, store)
  props = Object.assign(props, renderProps)
  renderProps.components[1] = renderProps.components[1]
  ReactDOM.render(<Provider store={store}><HeaderView {...renderProps}/></Provider>, header)
  ReactDOM.render(<Provider store={store}><Route {...renderProps} /></Provider>, target)
  // ReactDOM.render(<Provider store={store}><PopupCard {...props}/></Provider>, popup)
})