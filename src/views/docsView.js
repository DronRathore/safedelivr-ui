// docsView
import React from 'react'
import { connect } from 'react-redux'
import {isServer} from 'utils/isServer'

if (!isServer()){
  require("styles/docsView.scss")
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

class DocsView extends React.Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this)
  }
  componentWillMount() {
    this.props.dispatch({
      type: "ROUTE_CHANGE",
      payload: "docsView"
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
  getHeader(){
      return (
        <div className="flex-container center-align">
          <span className="salutation">API Documentation</span>
          <span className="info">Safedelivr provides you a robust way to deliver mail with fallbacks to one or another mail provider</span>
        </div>
      )
    }
  render() {
    return (
        <div className="docs-container">
          <div className="dashboard-content">
            {this.getHeader()}
          </div>
          <div className="heading">
            Basic
          </div>
          <p>
            You will need your personal <b>API_KEY</b> and <b>USER_ID</b> in order to make calls to the safedelivr's API server. Both can be found on the <a href="/settings">settings page</a>.
          </p>
          <div className="heading">
            Sending a Hello
          </div>
          <p>
            Let us start with sending a Hello World to your friends, you can easily try this with command line <b>curl</b> utility.
          </p>
          <pre>
            curl <span className="red">-X</span> <span className="yellow">POST</span> \<br/>
            -H <span className="yellow">Content-Type: application/x-www-form-urlencoded</span> --data \<br/>
              '<span className="orange">from</span>=me@me.com&\<br/>
              <span className="orange">to</span>=you@you.com&\<br/>
              <span className="orange">subject</span>=Holla&\<br/>
              <span className="orange">body</span>=Adios&\<br/>
              <span className="orange">user_id</span>=user_id&\<br/>
              <span className="orange">api_key</span>=api_key' https://safedelivr.com/api/batch/
          </pre>
          <p>The above request will return a unique <b>batch_id</b> which can be used later to access logs and status.</p>
          <pre>
            {"{"}<span className="orange">"status"</span>: "success", <span className="orange">"batch_id"</span>: <span className="yellow">"8020fcbf-7a31-11e7-9cb0-a45e60d46cc1"</span>}
          </pre>
           <div className="heading">
            Fetching Batch Status
          </div>
          <p>You can retrieve a Batch Status by simply calling a <b>GET</b> request on the <b>/api/batch/:batch_id</b> endpoint</p>
          <pre className="dont-wrap">
            <span className="yellow">curl</span> https://safedelivr.com/api/batch/<span className="orange">8020fcbf-7a31-11e7-9cb0-a45e60d46cc1</span>?user_id=YOUR_USER_ID&api_key=API_KEY
          </pre>
          <p>The API response will be in the format as shown below</p>
          <pre>
            {"{"}<br/>
              &emsp;&emsp;"code": "",<br/>
              &emsp;&emsp;"created_at": "2017-08-07T12:01:59.985Z",<br/>
              &emsp;&emsp;"description": "",<br/>
              &emsp;&emsp;"options": {"{"}<br/>
                  &emsp;&emsp;&emsp;&emsp;"content": "\u003cp\u003eHi\u003c/p\u003e \u003cp\u003eWelcome to SafeDelivr, please go to the dashboard to access stuff\u003c/p\u003e",<br/>
                  &emsp;&emsp;&emsp;&emsp;"from": "no-reply@safedelivr.com",<br/>
                  &emsp;&emsp;&emsp;&emsp;"isBulk": "true",<br/>
                  &emsp;&emsp;&emsp;&emsp;"name": "Dron Rathore",<br/>
                  &emsp;&emsp;&emsp;&emsp;"subject": "Welcome to SafeDelivr",<br/>
                  &emsp;&emsp;&emsp;&emsp;"to": "dron.rathore@gmail.com,dron.rathore@housing.com"<br/>
              },<br/>
              &emsp;&emsp;"reason": "",<br/>
              &emsp;&emsp;"status": "queued",<br/>
              &emsp;&emsp;"subject": "Welcome to SafeDelivr",<br/>
              &emsp;&emsp;"user_id": "8020fcbf-7a31-11e7-9cb0-a45e60d46cc1"<br/>
          }
          </pre>
          <p>
            The above will return the a JSON struct with the details of the batch and its status, it contains the original message too under the options key.
          </p>
          <div className="heading">
            Logs
          </div>
          <p>Safedelivr has a concept of Logs which are basically email logs, each log is associated to a <b>batch_id</b> and the fail safe mechanism works with this associativity.</p>
          <p>A single batch can have multiple log entries which correspondes to the individual receivers in the batch's <b>to</b> field</p>
          <div className="heading secondary">
            Accessing Logs
          </div>
          <p>To access logs of a <b>batch_id</b> you can hit the below endpoint</p>
          <pre>
            /api/batch/batch-id/logs?user_id=user_id&api_key=api_key
          </pre>
          <p>Above request will return a response similar to this</p>
          <pre>
            [{"{"}"<br/>
                &emsp;&emsp;"batch_id": "37ba28f3-7b68-11e7-a84f-a45e60d46cc1",<br/>
                &emsp;&emsp;"created_at": "2017-08-07T13:29:17.933Z",<br/>
                &emsp;&emsp;"email": "alice@example.com",<br/>
                &emsp;&emsp;"last_update": "2017-08-07T13:29:18.439Z",<br/>
                &emsp;&emsp;"log_id": "69c9952e-7b74-11e7-8ac6-a45e60d46cc1",<br/>
                &emsp;&emsp;"state": "dispatched",<br/>
                &emsp;&emsp;"status": {"{"}<br/>
                    &emsp;&emsp;&emsp;&emsp;"mailgun": true,<br/>
                    &emsp;&emsp;&emsp;&emsp;"sendgrid": true<br/>
                &emsp;&emsp;},<br/>
                &emsp;&emsp;"user_id": "8020fcbf-7a31-11e7-9cb0-a45e60d46cc1"<br/>
            }, {"{"}<br/>
                &emsp;&emsp;"batch_id": "37ba28f3-7b68-11e7-a84f-a45e60d46cc1",<br/>
                &emsp;&emsp;"created_at": "2017-08-07T13:25:20.291Z",<br/>
                &emsp;&emsp;"email": "dron.rathore@sendgrid.com",<br/>
                &emsp;&emsp;"last_update": "2017-08-07T13:25:21.73Z",<br/>
                &emsp;&emsp;"log_id": "dc2469d5-7b73-11e7-9ba6-a45e60d46cc1",<br/>
                &emsp;&emsp;"state": "dispatched",<br/>
                &emsp;&emsp;"status": {"{"}<br/>
                    &emsp;&emsp;&emsp;&emsp;"mailgun": true,<br/>
                    &emsp;&emsp;&emsp;&emsp;"sendgrid": false<br/>
                &emsp;&emsp;},<br/>
                &emsp;&emsp;"user_id": "8020fcbf-7a31-11e7-9cb0-a45e60d46cc1"<br/>
            }]
          </pre>
          <div className="heading secondary">
            Webhooks
          </div>
          <p>Future plans are well in place to support user webhooks. Currently not availaible. 😔</p>
          <div className="heading secondary">
            Architecture
          </div>
          <p>Safedelivr makes use of RabbitMq queues to transmit emails, whenever you make a request to the API server in most cases it will be accepted and than pushed to the queue.</p>
          <p>The fail-safe mechanism is incorporated within the <a href="https://github.com/DronRathore/safedelivr/blob/master/src/worker/generics.go#L133-L145">consumer</a>, whenever a Mail Provider crashes consumer will retry the same request with next availaible mail provider, and if that too fails than the same cycle is repeated till <b>MAX_RETRY_COUNT</b>, after that the request is marked failed.</p>
          <p>Safedelivr also retries to send a mail if it recieves a failed status from one of the providers webhook for a address. Safedelivr will push that request into the next availaible provider's queue and will wait for that provider's webhook response(to say), if all the providers are exhausted, the request is marked failed.</p>
          <p><b>Safedelivr will not try to resend an email if it recieves a HARD BOUNCE status from the mail provider</b></p>
          <div className="heading secondary">
            System Specs
          </div>
          <ul>
            <li><b>Storage</b>: cassandra@3.7</li>
            <li><b>Queueing</b>: rabbitmq@3.6.9</li>
            <li><b>Caching</b>: redis@4.0.1</li>
            <li><b>Api server</b>: golang@1.8.3</li>
            <li><b>UI server</b>: node@v8.0.1(react-js app)</li>
            <li><b>Monitoring</b>: datadog</li>
          </ul>
          <div className="heading secondary">
            Email Providers
          </div>
          <p>Currently safedelivr supports <b>Sendgrid</b> and <b>MailGun</b>, platform can be extended to any number of providers.</p>
          <div className="heading">
            Adding an Email Provider
          </div>
          <p>To add an email provider within the existing ecosystem you would be required to add few of the integrations to help it be more cohesive in the system.</p>
          <p>You will require to add the following:</p>
          <div className="heading">
            rabbitmq consumer
          </div>
          <p>You will have to create a separate Queue for the new email provider so that in case of fail safe recovery it can be directly called.</p>
          <p>The consumer executor was written keeping in mind the extensibility features of it, you would require to create these functions to help integrate it with the existing one</p>
          <pre>
            <span className="red">func</span> <span className="orange">Listener</span>(packet <span className="yellow">amqp.Delivery</span>)<br/>
            <span className="red">func</span> <span className="orange">GetEmailVars</span>(batchOptions <span className="yellow">map[string]string</span>, customArgs <span className="yellow">map[string]string</span>) (body <span className="red">string</span>, err <span className="red">error</span>)<br/>
            <span className="red">func</span> <span className="orange">SendRequest</span>(body <span className="yellow">*string</span>) (statusCode <span className="red">int</span>, err <span className="red">error</span>)
          </pre>
          <p>To get a gist of what a consumer will look like look at this <a href="https://github.com/dronrathore/safedelivr/blob/master/src/worker/sendgrid.go">sendgrid integration</a>.</p>
          <div className="heading">
            webhook
          </div>
          <p>You will have to create a webhook consumer too, in a webhook controller you can take carious decisions of whether to put back the email in the queue for re-processing or to save the status and exit.</p>
          <div className="heading">
            © Created with ❤ by Dron Rathore 🕺🏻 MIT LICENSED
          </div>
        </div>
      )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocsView)
// export {IndexViewActions as action}