const defer = require("config/defer").deferConfig;

if(!process.env.ENVIRONMENT)
	require('dotenv').config()

module.exports = {
	port: process.env.GLOBAL_PORT || 3004,
	env : process.env.ENVIRONMENT || 'local',
	logs:false,
	ms:{
		name: 'Node.js Boilerplate'
	},
	hostTest:'127.0.0.1'
}