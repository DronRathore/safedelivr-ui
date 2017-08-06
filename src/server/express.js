import express from "express"
import { match } from 'react-router'

export class Express {
	constructor(props) {
		this.port = props.port
		this.ip = props.ip
		this.app = express()
	}
	use(func){
		this.app.use(func)
	}
	set(key, value){
		this.app.set(key, value)
	}
	setRouter(router){
		this.routes = (new router()).router()
		this.app.use(this.handleRouter.bind(this))
	}
	handleRouter(req, res, next){
		const self = this
		match({
			routes: this.routes,
			location: req.url
		}, (err, redirectLocation, renderProps)=>{
			if (err){
				return self.error(err, req, res)
			}
			if (redirectLocation){
				return self.onRedirect(req, res, redirectLocation)
			}
			if (!redirectLocation && !renderProps){
				return self.error({code: 404}, req, res)
			}
			if (renderProps === undefined || renderProps == null){
				return self.error({code:404}, req, res)
			}
			return self.router(renderProps, req, res, next)
		})
	}
	static(path){
		if (path === undefined){
			this.app.use(express.static(path))
		} else {
			this.app.use(express.static(path))
		}
	}
	listen(port, ip){
		this.app.listen(port || this.port, ip || this.ip, this.onListen.bind(this))
	}
}