'use strict';

var _ = require('lodash');
var request = require('request');

module.exports = {

	sendNotification: function (type, options, callback) {
		var url = process.env.WEBHOOK_URL;
		var body = _.merge({ type: type }, options);
		request.post(url, { form: body }, function (err, result, body) {
			if (callback) callback(err, result);
		});
	},

}