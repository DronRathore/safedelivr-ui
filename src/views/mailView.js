// mailView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'
import {sendMail} from "../actions/mailViewActions"
import SideListView from "./sideListView"
import RichTextEditor from 'react-rte/lib/RichTextEditor'
import { WithContext as ReactTags } from 'react-tag-input';
const EmailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if (!isServer()){
  require("styles/dashboardView.scss")
}
const mapStateToProps = (state) => ({
  user: state.user,
  mail: state.mail
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}

class MailView extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.state = {
      value : RichTextEditor.createEmptyValue(),
      tags: [],
      from: this.props.user.email,
      isBulk: false,
      subject: ""
    }
    this.onChange = this.onChange.bind(this)
    this.addEmail = this.addEmail.bind(this)
    this.removeEmail = this.removeEmail.bind(this)
    this.toggleBulk = this.toggleBulk.bind(this)
    this.setSubject = this.setSubject.bind(this)
    this.sendMail = this.sendMail.bind(this)
    this.setFrom = this.setFrom.bind(this)
  }
  componentDidMount() {
    fetchUserData(this.props.dispatch)
    this.props.dispatch({
      type: "ROUTE_CHANGE",
      payload: "mailView"
    })
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user && nextProps.user.error != undefined){
      window.location = "/"
    }
    if (nextProps.mail.status && nextProps.mail.status.batch_id) {
      let reset = ()=>{
        this.props.dispatch({
          type: "SET_MAIL_STATUS",
          payload: null
        })
      }
      setTimeout(reset.bind(this), 2000)
    }
    if (nextProps.user.from != undefined){
      this.setState({
        from: nextProps.user.from
      })
    }
    return true;
  }
  componentDidMount() {
    console.log("Component has been mounted")
  }
  redirectToLogin() {
    window.location = "/api/login"
  }
  onChange(value){
    this.setState({value});
  }
  removeEmail(i){
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({tags: tags});
  }
  isEmail(tag){
    return EmailRegexp.test(tag)
  }
  addEmail(tag){
    if (this.isEmail(tag) === false)
      return
    var tags = this.state.tags
    tags.push({
      id: tags.length + 1,
      text: tag
    })
    this.setState({
      tags: tags
    })
  }
  toggleBulk(){
    this.setState({
      isBulk: !this.state.isBulk
    })
  }
  setSubject(event){
    this.setState({subject: event.target.value})
  }
  setFrom(event){
    this.setState({from: event.target.value})
  }
  sendMail(){
    if (this.state.tags.length == 0)
      return
    if (this.state.value.toString('html') === "<p></p>")
      return
    if (this.state.subject == "")
      return
    let to = this.state.tags.map((tag)=>{
      return tag.text
    })
    var from = this.state.from || this.props.user.email
    if (this.isEmail(from) == false) {
      alert("From should be an email address")
      return
    }
    let options = {
      to: to,
      subject: this.state.subject,
      from: this.props.user.email || this.state.from,
      is_bulk: this.state.isBulk,
      body: this.state.value.toString('html')
    }
    this.props.dispatch({
      type: "SET_MAIL_STATUS",
      payload: "Processing"
    })
    sendMail(this.props.dispatch, options)
  }
  render() {
    return (
        <div className="dashboard-container">
          <SideListView dispatch={this.props.dispatch} menu="create" router={this.props.router}/>
          <div className="dashboard-content">
            <div className="flex-container">
              {!this.props.mail.status && 
                <div>
                  <span className="salutation">Compose Mail</span>
                  <span className="info">You can send a mail to multiple users from here, using bulk option an individual copy will be sent to each receipient</span>
                  <span className="info">To send mail through API, use your API_Key and User_Id availaible on Settings page</span>
                </div>
              }
              {this.props.mail.status &&
                <div>
                  <span className="salutation">Mail Status: {this.props.mail.status.batch_id || this.props.mail.status}</span>
                </div>
              }
            </div>
            {!this.props.mail.status && 
              <div className="compose-mail-container">
                <div className="input-wrapper">
                  <span className="label">Add as many receipient(hit enter):</span>
                  <ReactTags
                    tags={this.state.tags}
                    handleDelete={this.removeEmail}
                    handleAddition={this.addEmail}
                    placeholder="Add Email"
                  />
                </div>
                <div className="input-wrapper">
                <span className="label">From:</span><br/>
                  <input type="text" value={this.state.from} className="subject" onChange={this.setFrom} placeholder="From"/>
                </div>
                <div className="input-wrapper">
                  <span className="label">Subject:</span><br/>
                  <input type="text" className="subject" onChange={this.setSubject} placeholder="Type Subject"/>
                </div>
                <RichTextEditor value={this.state.value} onChange={this.onChange}/>
                <div className="input-wrapper">
                  <input type="checkbox" name="bulk" id="bulk" />
                  <label htmlFor="bulk" onClick={this.toggleBulk}>Send as bulk </label>
                </div>
                <div className="input-wrapper">
                  <button className="submit" onClick={this.sendMail}>Send</button>
                </div>
              </div>
            }
          </div>
        </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MailView)
// export {IndexViewActions as action}