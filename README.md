![safedelivr.com](http://i.imgur.com/ZGzd6kW.png)
# [safedelivr-ui](https://safedelivr.com)
Front end React App for safedelivr.com

## Requirement
- NodeJs >= 8.0.1
- yarn
- supervisord(optional)

## How to
### Basic Setup
You will need yarn to install the project dependecies.
```sh
npm install yarn
yarn install
```
### Dev mode
To start the server in dev mode you can simply run ```yarn start``` this will start a webpack driven dev mode server.

### Prod mode
To compile the code and run in production mode simply run ```./build``` file, this will compile the server and the frontend assets.

To start the server in prod mode you can run ```yarn run startProd``` or optionally use ```supervisord``` or ```supervisorctl start app``` to boot the server.
## UI Views
### Dashboard Stats.
The chart view shows the stats of last 7 days. It shows the number of failed, success and queued emails.
![stats](http://i.imgur.com/XX3ovlo.png)
### Mail compose view.
Mail compose view helps you compose mail from the UI itself to get a feel of the service.
![compose mail](http://i.imgur.com/oEYybXr.png)
### Logs view
This view shows the Batches and further granular Logs status, this view will reflect new logs/statuses or retrial modes being performed by the server.
![logs view](http://i.imgur.com/z0Ckzd0.png)

## What is not done?
### Bundle size
- The webpack sharding isn't proper in current build, chunks can be further be made and code can be made more lean
- Backend printing, currently node server doesn't handle API call on backend, however ```initActions``` helper is in place and can be implemented by uncommenting the actions from components and adding the same in the actions file.
