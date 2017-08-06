// indexView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'
// import IndexViewActions from "../actions/indexViewActions"

if (!isServer()){
  require("styles/indexView.scss")
}
const mapStateToProps = (state) => ({
  cards: state.user
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}

class IndexView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch({
      type: "ROUTE_CHANGE",
      payload: "indexView"
    })
  }
  componentWillReceiveProps(nextProps) {
    
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  componentDidMount() {
    console.log("Component has been mounted")
  }
  redirectToLogin() {
    window.location = "/api/login"
  }
  render() {
    return (
        <div className="body-container">
          <div className="center-body">
            <h1>safeDelivr</h1>
            <h2>Fault Tolerant Email delivery for Hooman</h2>
            <div className="login-buttons">
              <button className="login-button" onClick={this.redirectToLogin}>Login with Github</button>
            </div>
          </div>
        </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexView)
// export {IndexViewActions as action}