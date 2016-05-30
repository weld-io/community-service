var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	env = process.env.NODE_ENV || 'development';

var config = {

	development: {
		root: rootPath,
		app: {
			name: 'community-service'
		},
		port: 3015,
		db: 'mongodb://localhost/community-service-development'
		
	},

	test: {
		root: rootPath,
		app: {
			name: 'community-service'
		},
		port: 3000,
		db: 'mongodb://localhost/community-service-test'
		
	},

	production: {
		root: rootPath,
		app: {
			name: 'community-service'
		},
		port: 3000,
		db: process.env.MONGOLAB_URI || 'mongodb://localhost/community-service-production'

	}

};

module.exports = config[env];