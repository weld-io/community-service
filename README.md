# Community Service

REST API service for generic community features (favoriting, featuring, comments) built in Node.js.


## How to Run

Just start with:

	grunt

Server will default to **http://localhost:3015**


## Entities

* **Item**: a Weld project, in this context.
* **Collection**: group/collection of *Items*.
* **User**: a Weld user, in this context. Community Service does NOT store email address - callbacks need to be used.
* **Comment**: a comment by a *User* on an *Item*.


## API

### Recent

Note: also Items added through Favorites or Featured will be available through here.

	GET	community-server/api/recent	// get list of recent Items
	POST	community-server/api/items	// add to Items and also recent

Example:

	curl http://localhost:3015/api/items
	curl http://localhost:3015/api/recent
	curl -X POST -H "Content-Type: application/json" -d '{ "reference": "MY_ITEM_ID" }' http://localhost:3015/api/items

### Favorites

	GET	community-server/api/favorites	// get list of most favorited Items
	POST	community-server/api/favorites/ITEM_REFERENCE	// make favorite
	DELETE	community-server/api/favorites/ITEM_REFERENCE	// unmake favorite

Example:

	curl http://localhost:3015/api/favorites
	curl -X POST -H "Content-Type: application/json" -d '{ "user": "MY_USER_ID" }' http://localhost:3015/api/favorites/MY_ITEM_ID
	curl -X DELETE -H "Content-Type: application/json" -d '{ "user": "MY_USER_ID" }' http://localhost:3015/api/favorites/MY_ITEM_ID

### Featured

	GET	community-server/api/featured	// get list of featured Items
	POST	community-server/api/featured/ITEM_REFERENCE	// make featured
	DELETE	community-server/api/featured/ITEM_REFERENCE	// unmake featured

### Comments

> Inconsistent API vs. Favorites above?

	GET	community-server/api/comments/ITEM_REFERENCE	// get list of comments for Item
	POST	community-server/api/comments/ITEM_REFERENCE	// create comment (User ID + text)
	DELETE	community-server/api/comments/ITEM_REFERENCE/COMMENT_ID	// unmake featured

### Collections

TBD


## Implementation

Built on Node.js, Express, and MongoDB.


## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku addons:create mongolab
	heroku config:set NODE_ENV=production

	# Set password used in API requests
	heroku config:set API_PASSWORD=MYPASSWORD
