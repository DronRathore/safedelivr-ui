// router
import React from "react"
import Route from "react-router/lib/Route"
import RedirectRoute from "react-router/lib/Redirect"
import IndexRoute from "react-router/lib/IndexRoute"
import {requireCss} from "../utils/requireCSS"
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export class Router {
	constructor(props) {
		// do something
	}
	router(){
		return (
			<Route path="/" onChange={this.onchange}>
				<IndexRoute
					chunkName="indexView"
					getComponent={(location, callback)=>{
					requireCss("indexView", ()=>{
						require.ensure(["views/indexView"], (_require)=>{
							 callback(null, require("views/indexView").default)
						}, "indexView")
					})
				}}/>
        <Route 
          path="/create"
          onChange={this.onchange}
          chunkName="mailView"
          getComponent={(location, callback)=>{
            requireCss("dashboardView", ()=>{
              require.ensure(["views/mailView"], (_require)=>{
                 callback(null, require("views/mailView").default)
              }, "mailView")
            })
          }}
        />
        <Route 
          path="/dashboard"
          onChange={this.onchange}
          chunkName="dashboardView"
          getComponent={(location, callback)=>{
            requireCss("docsView", ()=>{
              require.ensure(["views/dashboardView"], (_require)=>{
                 callback(null, require("views/dashboardView").default)
              }, "dashboardView")
            })
          }}
        />
        <Route 
          path="/docs"
          onChange={this.onchange}
          chunkName="docsView"
          getComponent={(location, callback)=>{
            requireCss("docsView", ()=>{
              require.ensure(["views/docsView"], (_require)=>{
                 callback(null, require("views/docsView").default)
              }, "docsView")
            })
          }}
        />
        <Route 
          path="/settings"
          onChange={this.onchange}
          chunkName="settingsView"
          getComponent={(location, callback)=>{
            requireCss("dashboardView", ()=>{
              require.ensure(["views/settingsView"], (_require)=>{
                 callback(null, require("views/settingsView").default)
              }, "settingsView")
            })
          }}
        />
        <Route 
          path="/logs"
          onChange={this.onchange}
          chunkName="dashboardView"
          getComponent={(location, callback)=>{
            requireCss("dashboardView", ()=>{
              require.ensure(["views/logView"], (_require)=>{
                 callback(null, require("views/logView").default)
              }, "dashboardView")
            })
          }}
        >
        <IndexRoute
          onChange={this.onchange}
          chunkName="dashboardView"
          getComponent={(location, callback)=>{
            requireCss("dashboardView", ()=>{
              require.ensure(["views/logView"], (_require)=>{
                 callback(null, require("views/logView").default)
              }, "dashboardView")
            })
          }}
        />
        <Route 
          path=":batch_id"
          onChange={this.onchange}
          chunkName="dashboardView"
          getComponent={(location, callback)=>{
            requireCss("dashboardView", ()=>{
              require.ensure(["views/logView"], (_require)=>{
                 callback(null, require("views/logView").default)
              }, "indexView")
            })
          }}
        />
        </Route>
      </Route>
			)
	}
	// route on change handlert
	onchange(prev, next){
		// tracking code, or other meta
	}
}