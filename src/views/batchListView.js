// BatchListView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'
import {fetchBatches, fetchLogs} from "../actions/batchViewActions"

const mapStateToProps = (store) => ({
  user: store.user,
  batches: store.batches
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}
class BatchListView extends React.Component {
  constructor(props) {
    super(props);
    this.showBatchLogs = this.showBatchLogs.bind(this)
  }
  componentWillMount() {
    this.props.dispatch({
      type: "ROUTE_CHANGE",
      payload: "logsView"
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.batches.selected != this.props.batches.selected && nextProps.batches.selected != undefined){
      fetchLogs(this.props.dispatch, nextProps.batches.selected.batch_id)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user && nextProps.user.error != undefined){
      window.location = "/"
    }
    return true;
  }
  componentDidMount() {
    fetchBatches(this.props.dispatch)
    console.log("Component has been mounted")
  }
  showBatchLogs(event){
    const id = event.currentTarget.getAttribute("data-id")
    this.props.dispatch({
      type: "SHOW_BATCH",
      payload: id
    })
    this.props.router.push("/logs/" + id)
  }
  renderBatchElement(batches) {
    if (batches.list === undefined){
      return null
    }
    return batches.list.map((batch)=>{
      var date = new Date(batch.created_at)
      return (
          <div className="batch-row" key={batch.batch_id} data-id={batch.batch_id} onClick={this.showBatchLogs}>
            <div className="batch-cell">
              {batch.batch_id.split("-")[0]}
            </div>
            <div className="batch-cell">
              {batch.subject}
            </div>
            <div className="batch-cell">
              {batch.status}
            </div>
            <div className="batch-cell">
              {batch.options.isBulk}
            </div>
            <div className="batch-cell">
              {batch.options.to.split(',').length}
            </div>
            <div className="batch-cell">
              {date.toString().split("GMT")[0].trim()}
            </div>
          </div>
        )
    })
  }
  getBatchHeader(){
    return (
      <div className="batch-row header-row">
        <div className="batch-cell">
          Batch ID
        </div>
        <div className="batch-cell">
          Subject
        </div>
        <div className="batch-cell">
          Status
        </div>
        <div className="batch-cell">
          Bulk
        </div>
        <div className="batch-cell">
          Receipients
        </div>
        <div className="batch-cell">
          Date
        </div>
      </div>
    )
  }
  getLogHeader(){
    return (
      <div className="batch-row header-row">
        <div className="batch-cell">
          Log ID
        </div>
        <div className="batch-cell">
          Receipient
        </div>
        <div className="batch-cell">
          Status
        </div>
        <div className="batch-cell">
          Providers
        </div>
        <div className="batch-cell">
          Last Update
        </div>
        <div className="batch-cell">
          Created
        </div>
      </div>
    )
  }
  renderLogElement(logs){
    if (logs === undefined){
      return null
    }
    return logs.map((log)=>{
      var update = new Date(log.last_update)
      var created = new Date(log.created_at)
      return (
        <div className="batch-row" key={log.log_id} data-id={log.log_id}>
          <div className="batch-cell">
            {log.log_id.split("-")[0]}
          </div>
          <div className="batch-cell">
            {log.email}
          </div>
          <div className="batch-cell">
            {log.state}
          </div>
          <div className="batch-cell">
            {Object.keys(log.status).join(", ")}
          </div>
          <div className="batch-cell">
            {update.toString().split("GMT")[0].trim()}
          </div>
          <div className="batch-cell">
            {created.toString().split("GMT")[0].trim()}
          </div>
        </div>
      )
    })
  }
  redirectToLogin() {
    window.location = "/api/login"
  }
  render() {
    return (
      <div className="batch-table">
        {this.props.batches.selected == undefined && this.getBatchHeader()}
        {this.props.batches.selected != undefined && this.getLogHeader()}
        {this.props.batches.selected == undefined && this.renderBatchElement(this.props.batches)}
        {this.props.batches.selected != undefined && this.renderLogElement(this.props.batches.logs)}
      </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchListView)
// export {IndexViewActions as action}