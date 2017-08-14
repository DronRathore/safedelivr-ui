// dashboardView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'
import {fetchUserData, fetchStats} from "../actions/dashboardViewActions"
import SideListView from "./sideListView"
import { AreaChart, Area, Line, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

if (!isServer()){
  require("styles/dashboardView.scss")
}
const mapStateToProps = (state) => ({
  user: state.user,
  stats: state.stats
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
    if (this.props.user && !this.props.user.email){
      fetchUserData(this.props.dispatch)
    }
    if (this.props.stats && !this.props.stats.fetched){
      fetchStats(this.props.dispatch)
    }
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
              <AreaChart width={600} height={300} data={this.props.stats.data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <Area type='monotone' dataKey='success' stackId="1" stroke='#8884d8' fill='#8884d8' />
                <Area type='monotone' dataKey='queued' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                <Area type='monotone' dataKey='failed' stackId="1" stroke='#ffc658' fill='#ffc658' />
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </AreaChart>
            </div>
          </div>
        </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
// export {IndexViewActions as action}