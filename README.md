# Community Service

REST API service for generic community features (favoriting, featuring, comments) built in Node.js.


## How to Run

Just start with:

	export WEBHOOK_URL=http://localhost:3000/api/my-notification-path # Optional, see “Webhooks” below.

	grunt

Server will default to **http://localhost:3015**


## Entities

* **Item**: the main object that should support favoriting, featuring, comments. Use `item` in POST body to supply external reference.
* **User**: a user that can favorite, feature, comment. Use `user` in POST body to supply external reference. Community Service does NOT store email address - see “Webhooks” below.
* **Collection**: an ordered group of *Items*.
* **Comment**: a comment by a *User* on an *Item*.


## API

### Recent

Note: also Items added through Favorites or Featured will be available through here.

	GET     community-server/api/items   // get list of Items
	GET     community-server/api/recent  // get list of recent Items
	POST    community-server/api/items   // add to Items and also recent

Examples:

	curl http://localhost:3015/api/items
	curl http://localhost:3015/api/recent
	curl -X POST -H "Content-Type: application/json" -d '{ "item": "MY_ITEM_REFERENCE" }' http://localhost:3015/api/items

### Favorites

	GET     community-server/api/favorites                       // get list of most favorited Items
	POST    community-server/api/favorites                       // make favorite
	DELETE  community-server/api/favorites/ITEM_REFERENCE        // unmake favorite

	GET     community-server/api/users/USER_REFERENCE/favorites  // (NOT YET SUPPORTED) get list of User’s favorited Items

Note: for POST and DELETE actions, a `user` reference must be present in the body.

Examples:

	curl http://localhost:3015/api/favorites
	curl -X POST -H "Content-Type: application/json" -d '{ "user": "MY_USER_REFERENCE", "item": "MY_ITEM_REFERENCE" }' http://localhost:3015/api/favorites
	curl -X DELETE -H "Content-Type: application/json" -d '{ "user": "MY_USER_REFERENCE" }' http://localhost:3015/api/favorites/MY_ITEM_ID

### Featured (NOT YET SUPPORTED)

	GET     community-server/api/featured                 // get list of featured Items
	POST    community-server/api/featured                 // make featured
	DELETE  community-server/api/featured/ITEM_REFERENCE  // unmake featured

### Comments (NOT YET SUPPORTED)

	GET     community-server/api/items/ITEM_REFERENCE/comments             // get list of Comments for Item
	POST    community-server/api/items/ITEM_REFERENCE/comments             // create Comment (User ID + text)
	DELETE  community-server/api/items/ITEM_REFERENCE/comments/COMMENT_ID  // delete Comment

	GET     community-server/api/users/USER_REFERENCE/comments             // get list of User’s Comments on all Items
	GET     community-server/api/comments                                  // get list of all latest Comments on all Items

### Collections (NOT YET SUPPORTED)

	GET     community-server/api/collections                                     // get list of all Collections
	POST    community-server/api/collections                                     // create new Collection
	DELETE  community-server/api/collections/COLLECTION_ID                       // delete Collection

	GET     community-server/api/users/USER_REFERENCE/collections                // get list of User’s Collections

	POST    community-server/api/collections/COLLECTION_ID/items                 // add Item to Collection
	DELETE  community-server/api/collections/COLLECTION_ID/items/ITEM_REFERENCE  // remove Item from Collection

Note: for POST and DELETE actions, a `user` reference must be present in the body.


## Authentication

TBD


## Pagination, filtering, and sorting

TBD


## Webhooks

Community Service does not store email addresses, it uses a webhook system to support user notifications.

To use it, set the `WEBHOOK_URL` environment variable to the complete URL of where the notification data should be POST:ed.


## Implementation

Built on Node.js, Express, and MongoDB.


## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku addons:create mongolab
	heroku config:set NODE_ENV=production
	heroku config:set WEBHOOK_URL=https://mainapp.herokuapp.com/api/my-notification-path
