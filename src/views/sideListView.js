// sidemenu.jsx
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'

const mapStateToProps = (state) => ({
  // menu: state.menu
})

const mapDispatchToProps = (dispatch)=>{
  return {
    dispatch: dispatch
  }
}

class SideListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu : this.props.menu || "dashboard"
    }
    this.changeMenu = this.changeMenu.bind(this)
  }
  componentDidMount() {
  	//no menu selected
  	if (this.props.menu == ""){
      this.props.dispatch({
        type: "SET_MENU",
        payload: "dashboard"
      })
  	}
  }
  changeMenu(event) {
    const name = event.target.getAttribute("data-name")
    event.preventDefault()
    this.props.dispatch({
      type: "SET_MENU",
      payload: name
    })
    this.props.router.push('/' + name)
    this.props.dispatch({
      type: "UNSET_BATCH"
    })
    return false
  }
  render() {
    return (
        <ul className="left-menu">
          <li>
            <a
              href="/create"
              data-name="create"
              onClick={this.changeMenu}
              className={this.state.menu == "create"? "selected": ""}
            >
              Send Mail
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              className={this.state.menu == "dashboard"? "selected": ""}
              data-name="dashboard"
              onClick={this.changeMenu}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/logs"
              className={this.state.menu == "logs"? "selected": ""}
              data-name="logs"
              onClick={this.changeMenu}
            >
              Logs
            </a>
          </li>
        </ul>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideListView)
// export {IndexViewActions as action}