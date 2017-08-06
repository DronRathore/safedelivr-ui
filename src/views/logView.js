// logsView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'
import {fetchUserData} from "../actions/dashboardViewActions"
import SideListView from "./sideListView"
import BatchListView from "./batchListView"

if (!isServer()){
  require("styles/dashboardView.scss")
}
const mapStateToProps = (state) => ({
  user: state.user,
  batches: state.batches
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}

class LogView extends React.Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this)
  }
  componentWillMount() {
    fetchUserData(this.props.dispatch)
    this.props.dispatch({
      type: "ROUTE_CHANGE",
      payload: "logsView"
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      batch_id: nextProps.router.params.id
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user && nextProps.user.error != undefined){
      window.location = "/"
    }
    return true;
  }
  componentDidMount() {
    if (this.props.router.params.batch_id != undefined){
      this.props.dispatch({
        type: "SHOW_BATCH",
        payload: this.props.router.params.batch_id
      })
    }
    console.log("Component has been mounted")
  }
  redirectToLogin() {
    window.location = "/api/login"
  }
  getHeader(){
    if (this.props.batches.selected != undefined){
      const selected = this.props.batches.selected
      return (
        <div className="flex-container">
          <span className="salutation">Batch#{this.props.batches.selected.batch_id.split("-")[0]}</span>
          {selected.subject && <span className="info">{selected.subject}</span>}
        </div>
      )
    }
    return (
      <div className="flex-container">
        <span className="salutation">Logs</span>
        <span className="info">These are the recent mail batches that you have sent, click to look for individual logs</span>
      </div>
      )
  }
  render() {
    return (
        <div className="dashboard-container">
          <SideListView dispatch={this.props.dispatch} menu="logs" router={this.props.router}/>
          <div className="dashboard-content">
            {this.getHeader()}
          </div>
          <BatchListView router={this.props.router} dispatch={this.props.dispatch} />
        </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogView)
// export {IndexViewActions as action}