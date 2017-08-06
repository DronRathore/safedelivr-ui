// settingsView
import React from 'react'
import { connect } from 'react-redux'
import SideListView from "./sideListView"
import {fetchUserData} from "../actions/dashboardViewActions"

const mapStateToProps = (state) => ({
  user: state.user,
  stats: state.stats
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}
class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {

  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user && nextProps.user.error != undefined){
      window.location = "/"
    }
    return true;
  }
  componentDidMount() {
    fetchUserData(this.props.dispatch)
    console.log("Component has been mounted")
  }
  redirectToLogin() {
    window.location = "/api/login"
  }
  render() {
    return (
      <div className="dashboard-container">
        <SideListView dispatch={this.props.dispatch} menu="settings" router={this.props.router}/>
        <div className="dashboard-content">
          <div className="flex-container">
            <span className="salutation">Settings</span>
            <span className="info">Use the below provided api_key and user_id to make POST requests to our API</span>
            <span className="info">Go to our API documentation page to get familiar with the API</span>
          </div>
          <div className="status-chart">
            <div className="input-wrapper">
              <span className="label">User ID (user_id)</span>
      	      <input type="text" className="subject" value={this.props.user.uuid} readOnly/>
          	</div>
            <div className="input-wrapper">
              <span className="label">API Key (api_key)</span>
              <input type="text" className="subject" value={this.props.user.api_key} readOnly/>
            </div>
          </div>
        </div>
      </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
// export {IndexViewActions as action}