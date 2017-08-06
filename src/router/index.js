// router
import React from "react"
import Route from "react-router/lib/Route"
import RedirectRoute from "react-router/lib/Redirect"
import IndexRoute from "react-router/lib/IndexRoute"
import {requireCss} from "../utils/requireCSS"
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

// if (!__SERVER__) {
//   window.requireStyle = requireStyle = (chunkname, skip) => {
//     // const Skip = skip && isBackendPrinted
//     if (document.getElementById(`chunk-${chunkname}`)) {
//       return new Promise(resolve => {
//         resolve()
//       })
//     }
//     return new Promise(resolve => {
//       const callCb = () => {
//         resolve()
//       }
//       requireCss(chunkname, callCb)
//     })
//   }
// } else {
//   requireStyle = () => {
//     return new Promise(resolve => {
//       resolve()
//     })
//   }
// }

// function loadResource (chunkname, skip) {
//   const hasRID = window.requestIdleCallback
//   if (hasRID) {
//     const func = () => {
//       requireStyle(chunkname, skip)
//     }
//     window.requestIdleCallback(func)
//   } else {
//     requireStyle(chunkname, skip)
//   }
// }


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
            console.log("Getting componenet")
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
            console.log("Getting componenet")
            requireCss("dashboardView", ()=>{
              require.ensure(["views/dashboardView"], (_require)=>{
                 callback(null, require("views/dashboardView").default)
              }, "dashboardView")
            })
          }}
        />
        <Route 
          path="/settings"
          onChange={this.onchange}
          chunkName="settingsView"
          getComponent={(location, callback)=>{
            console.log("Getting componenet")
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
            console.log("Getting componenet")
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
            console.log("Getting componenet")
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
            console.log("Getting componenet")
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
//  <Route 
//    path="/inbox"
//    chunkName="inboxView"
//    onChange={this.onchange}
//    getComponent= {(location, callback)=>{
//      requireCss("inboxView", ()=>{
//        require.ensure(["views/inboxView"], (_require)=>{
//          callback(null, require("views/inboxView"))
//        }, "inboxView")
//      })  
//    }}
//  />
//  <Route 
//    path="/sent"
//    chunkName="sentView"
//    type="locality"
//    onChange={this.onchange}
//    getComponent= {(location, callback)=>{
//      requireCss("indexView", ()=>{
//        require.ensure(["views/sentView"], (_require)=>{
//          callback(null, require("views/sentView"))
//        }, "sentView")
//      })  
//    }}
//  />
//  <Route 
//    path="/logout"
//    chunkName="logoutView"
//    type="locality"
//    onChange={this.onchange}
//    getComponent= {(location, callback)=>{
//      requireCss("indexView", ()=>{
//        require.ensure(["views/logoutView"], (_require)=>{
//          callback(null, require("views/logoutView"))
//        }, "logoutView")
//      })  
//    }}
//  />
// </Route>