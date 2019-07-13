# bucketList
Restful Api with Node.js and Mogodb


The Following are the Endpoint for the RestFul Api
POST /auth/login

Logs a user in

GET /auth/logout

Logs a user out

POST /bucketlists/

Create a new bucket list

GET /bucketlists/

List all the created bucket lists

GET /bucketlists/<id>

//Get single bucket list

PUT /bucketlists/<id>

//Update this bucket list

DELETE /bucketlists/<id>

//Delete this single bucket list

POST /bucketlists/<id>/items/

//Create a new item in bucket list

GET /bucketlists/<id>/items

//List all the created items in a bucket list

GET /bucketlists/<id>/items/<id>

//Get a single item in a bucket list

PUT /bucketlists/<id>/items/<item_id>

//Update a bucket list item

DELETE /bucketlists/<id>/items/<item_id>

//Delete an item in a bucket list


The api can be accessed thus - https://bucketlisttask.herokuapp.com/api/v1/{someendpoint above}
