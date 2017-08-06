var yaml = require('yamljs')
var fs = require('fs')
var path = require('path')

const appConfig = yaml.load(path.resolve('./config', './application.yml'))
appConfig.ip = appConfig.ip || "localhost"
appConfig.port = appConfig.port || "4000"
const config = new Map()

config.set("env", process.env.NODE_ENV || "dev")
config.set('dir_src',  path.resolve("./", "src"));
config.set('dir_dist', path.resolve("./", "dist"))
config.set('views', path.resolve("./", "src/views"))
config.set('styles', path.resolve("./", "src/styles"))
config.set('appConfig', appConfig)

var paths = (function() {
  var base    = path.resolve("./");
  var resolve = path.resolve;

  var project = function(){
  	var _paths = Array.prototype.slice.call(arguments)
  	return resolve.apply(resolve, [base].concat(_paths));
  }

  return {
    project : project,
    src     : project.bind(null, config.get('dir_src')),
    dist    : project.bind(null, config.get('dir_dist'))
  };
})();

config.set('aliases', [
	"styles",
	"views",
	"actions",
	"reducers",
	"store",
  "utils"
].reduce(function(acc, dir){
	acc[dir] = paths.src(dir);
	return acc;
}, {}))

// global variables
// Webpack helper configs internal configs, don't touch.
config.set('globals', {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.get('env'))
  },
  'NODE_ENV'     : config.get('env'),
  '__DEV__'      : config.get('env') === 'development',
  '__PROD__'     : config.get('env') === 'production',
  '__DEBUG__'    : config.get('env') === 'development',
  '__SERVER__'   : false
});


config.set('webpack_port',  8080);
config.set('webpack_host',  'localhost');

config.set('webpack_public_path',
  `http://${config.get('webpack_host')}:${config.get('webpack_port')}/`
);

config.set('vendor_dependencies', [
  'axios',
  'react',
  'react-redux',
  'react-router',
  'react-router/lib/Link',
  'react-router/lib/match',
  'react-router/lib/browserHistory',
  'react-router/lib/RouterContext',
  'react-router/lib/Redirect',
  'react-router/lib/Route',
  'react-router/lib/IndexRoute',
  'react-router/lib/Router',
  'redux',
  'react-router-redux'
]);

module.exports = config