'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var ItemSchema = new Schema({
	item: { type: String, unique: true }, // External reference
	dateCreated: { type: Date, default: Date.now },
	metadata: {},
	favoritedBy: {},
	favoritesCount: { type: Number, default: 0 },
	dateFeatured: { type: Date },
});

ItemSchema.plugin(findOrCreate);

mongoose.model('Item', ItemSchema);
