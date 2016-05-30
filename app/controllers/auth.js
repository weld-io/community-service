'use strict';

module.exports = {

	isAuthenticated: function (req, res, next) {
		if (true) {
			return next();
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	}

}