require('babel-register')

const config = require('./config')
module.exports = require('./webpack/configs/' + config.get('env')).default
