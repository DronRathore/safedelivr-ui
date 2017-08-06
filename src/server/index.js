'use strict'

import path from 'path'
import React from 'react'
import bodyParser from 'body-parser'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import {bindActionCreators} from "redux"

import assets from "../../webpack-assets.json"
import {Express} from './express'
import {Router} from '../router'
import config  from '../../config'
import {getStore} from "../store"
import HeaderView from "../views/headerView"

global.assetPaths = assets
global.__SERVER__ = true
const assetsString = JSON.stringify(assets)

class Server extends Express {
	constructor(props) {
		super(props);
		this.use(bodyParser.json())
		this.use(bodyParser.urlencoded({extended:false}))
		this.set('view engine', "jade")
		this.set('views', config.get('dir_src') + "/templates")
		this.attachWebPack()
		this.static(config.get('dir_dist'))
		this.use(this.createStore)
		this.use(this.router)
		this.setRouter(Router)
		this.listen(config.port, "0.0.0.0")
	}
	// get a store attached
	createStore(req, res, next){
		req.store = getStore({})
		next()
	}
	// handles router
	router(renderProps, req, res, next){
		const _Component = renderProps.components[1]
		const Component = <Provider store={req.store}><_Component/></Provider>
    	const Header = <Provider store={req.store}><HeaderView/></Provider>
		const Action = bindActionCreators(renderProps.components[1].action||this.noopActions(), req.store.dispatch);
		req.store.dispatch({
			type: "ROUTER_PARAMS",
			payload: renderProps.router.params
		})
		const params = renderProps.routes[1]
		const link = assets[params.chunkName].css
		return Action.initActions(req.store.dispatch, req.store.getState).then((data)=>{
			res.render("index", {
				html: renderToString(Component),
        header: renderToString(Header),
				assets: assetsString,
				link: link,
				cdnHost: config.cdnHost,
				store: req.store.getState(),
				title: "SafeDelivr – Email Service for Hoomen"
			})
			return res.end()
		}).catch((err)=>{
			return res.json(err);
		})
	}
	noopActions(){
		return {
			initActions: ()=>{
				return (dispatch, getState)=>{
					return new Promise((resolve, _)=>{
						return resolve({})
					})
				}
			}
		}
	}
	// if redirect of route
	onRedirect(req, res, redirectLocation){
		return res.redirect(301, redirectLocation)
	}
	// handles error
	error(err, req, res){
		if (err.code === 404){
			return res.end("Not Found")
		}
		if (err.code === 500){
			return res.end("Internal Server Error")
		}
	}
	// listen event handler
	onListen(){
		console.log("Server started at", this.port)
	}
	attachWebPack(){
		if (process.env.NODE_ENV === "production"){
			return false
		}
		const {webpackDevMiddleware, webpackHotMiddleware} = require('../../webpack/hotload').default
		this.use(webpackDevMiddleware)
		this.use(webpackHotMiddleware)
	}
}

var app = new Server({port: config.get('appConfig').port, ip: config.get('appConfig').port})