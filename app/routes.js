/**
 * Application routes for REST
 */

'use strict';

var express = require('express');

module.exports = function (app, config) {

	var router = express.Router();
	app.use('/', router);

	// Controllers
	var authController = require(config.root + '/app/controllers/auth');
	var itemsController = require(config.root + '/app/controllers/items');

	// Routes

	// Basic CRUD for Items
	router.get('/api/items', authController.isAuthenticated, itemsController.list);
	router.get('/api/items/:itemReference', authController.isAuthenticated, itemsController.read);
	router.post('/api/items', authController.isAuthenticated, itemsController.create);
	router.put('/api/items/:itemReference', authController.isAuthenticated, itemsController.update);
	router.delete('/api/items/:itemReference', authController.isAuthenticated, itemsController.delete);

	// Recent
	router.get('/api/recent', authController.isAuthenticated, itemsController.listRecent);

	// Favorites
	router.get('/api/favorites', authController.isAuthenticated, itemsController.listFavorites);
	router.post('/api/favorites', authController.isAuthenticated, itemsController.createFavorite);
	router.delete('/api/favorites/:itemReference', authController.isAuthenticated, itemsController.removeFavorite);

	//router.get('/', startController.index);

};