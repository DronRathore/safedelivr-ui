// dashboardView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'
import {fetchUserData} from "../actions/dashboardViewActions"
import SideListView from "./sideListView"
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

if (!isServer()){
  require("styles/dashboardView.scss")
}
const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}

class DashboardView extends React.Component {
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
          <SideListView dispatch={this.props.dispatch} menu="dashboard" router={this.props.router}/>
          <div className="dashboard-content">
            <div className="flex-container">
              <span className="salutation">Holla {this.props.user && this.props.user.name && this.props.user.name.split(" ")[0]}!</span>
              <span className="info">You can start sending mails through Send Mail button or by using our APIs</span>
              <span className="info">Go to our API documentation page to get familiar with the API</span>
            </div>
            <div className="status-chart">
              <LineChart width={600} height={300} data={this.props.stats} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
            <input type="text" value={this.props.user.api_key} readOnly/>
          </div>
        </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
// export {IndexViewActions as action}