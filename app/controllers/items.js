'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var webhook = require('../helpers/webhook');

module.exports = {

	// List all Items
	list: function (req, res, next) {
		var searchQuery = {};
		var searchOptions = { sort: { dateCreated: 1 } };
		switch (req.query.sort) {
			case 'dateCreated':
				searchOptions.sort = { dateCreated: -1 };
				break;
			case 'favoritesCount':
				searchOptions.sort = { favoritesCount: -1 };
				break;
		}
		Item.find(searchQuery, null, searchOptions).lean().exec(function (err, items) {
			if (err) {
				return res.status(400).json(err);
			}
			else {
				return res.json(items);
			}
		});
	},

	// Show an Item
	read: function (req, res, next) {
		var searchQuery = {};
		searchQuery.item = req.params.itemReference;
		Item.find(searchQuery).lean().exec(function (err, items) {
			if (err) {
				return res.status(400).json(err);
			}
			else if (items.length === 0) {
				return res.status(404).json('Item not found');
			}
			else {
				return res.json(items[0]);
			}
		});
	},

	// Create new Item
	create: function (req, res, next) {
		var newItem = new Item(req.body);
		newItem.save(function (err) {
			if (err) {
				return res.status(400).json(err);
			}
			else {
				return res.json(newItem);
			}
		});
	},

	// Update an Item
	update: function (req, res, next) {
		var searchQuery = {};
		searchQuery.item = req.params.itemReference;
		Item.update(
			searchQuery,
			req.body,
			function (updateErr, numberAffected, rawResponse) {
				if (updateErr) {
					res.status(500).json(updateErr);
				}
				else {
					res.status(200).json('Updated item ' + req.params.itemReference);
				}
			}
		);
	},

	// Delete an Item
	delete: function (req, res, next) {
		var searchQuery = {};
		searchQuery.item = req.params.itemReference;
		Item.remove(
			searchQuery,
			function(itemErr, numberAffected, rawResponse) {
				if (itemErr) {
					res.status(500).json(itemErr);
				}
				else {
					res.status(200).json('Deleted ' + numberAffected + ' items');
				}
			}
		);
	},

	// ----- Recent -----

	listRecent: function (req, res, next) {
		req.query.sort = 'dateCreated';
		module.exports.list(req, res, next);
	},

	// ----- Favorites -----

	listFavorites: function (req, res, next) {
		req.query.sort = 'favoritesCount';
		module.exports.list(req, res, next);
	},

	createFavorite: function (req, res, next) {
		var searchQuery = {};
		searchQuery.item = req.body.item;
		Item.findOrCreate(searchQuery, function (errFind, item, created) {
			item.favoritedBy = item.favoritedBy || {};
			item.favoritedBy[req.body.user] = { dateFavorited: new Date() };
			item.favoritesCount = _.keys(item.favoritedBy).length;
			item.save(function (errSave) {
				if (errSave) {
					return res.status(400).json(errSave);
				}
				else {
					webhook.sendNotification('favorite', { item: req.body.item, user: req.body.user });
					return res.json(item);
				}
			});
		});
	},

	removeFavorite: function (req, res, next) {
		var searchQuery = {};
		searchQuery.item = req.params.itemReference;
		Item.findOne(searchQuery).exec(function (errFind, item) {
			if (errFind) {
				return res.status(404).json(errFind);
			}
			else {
				item.favoritedBy = item.favoritedBy || {};
				delete item.favoritedBy[req.body.user];
				item.favoritesCount = _.keys(item.favoritedBy).length;
				Item.update(searchQuery, item, function (errSave) {
					if (errSave) {
						return res.status(400).json(errSave);
					}
					else {
						return res.json(item);
					}
				});
			}
		});
	},

	// ----- Featured -----

}