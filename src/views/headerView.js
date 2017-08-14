// indexView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'
import Link from 'react-router/lib/Link'

// import HeaderViewActions from "../actions/headerViewActions"

if (!isServer()){
  require("styles/headerView.scss")
}
const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}

class HeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this)
    this.getHeaderLinks = this.getHeaderLinks.bind(this)
  }
  navigate(event) {
    event.preventDefault()
    const href = event.currentTarget.getAttribute('data-href')
    this.props.router.push(href)
    return false
  }
  getHeaderLinks() {
    if (this.props.user && this.props.user.email != undefined) {
      // user header
      return (
          <div>
            <div className="lfloat-links">
              <span className="link"><a href="/dashboard">safedelivr</a></span>
            </div>
            <div className="lfloat-links rfloat-links">
              <span className="link"><a href="/api/user/logout">Logout</a></span>
            </div>
          </div>
        )
    } else {
      return (
        <div>
          <div className="lfloat-links">
            <span className="link"><a href="/docs">Documentation</a></span>
            <span className="link"><a href="https://github.com/dronrathore/safedelivr">Code</a></span>
          </div>
        </div>
        )
    }
  }
  render() {
    // print header according to user state
    return (
        <div className="header">
          {this.getHeaderLinks()}
        </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView)
// export {HeaderViewActions as action}