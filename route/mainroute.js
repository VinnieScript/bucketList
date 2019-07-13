const controller = require('../controller/maincontroller');
const express = require('express');
const route = express.Router();
const dateformat = require('dateformat');
const jwt = require('jsonwebtoken');
const registerUser = require('../model/registerUser');
const createBucket = require('../model/createBucket');

function verifyToken(req,res,next){

	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader!== 'undefined'){
		const bearerToken = bearerHeader.split(' ');
	const realToken = bearerToken[1];

	req.token= realToken;
	
	next();
	}
	else{
		res.sendStatus(403);
	}	

}

route.get('/', controller.index);
route.post('/register', controller.register);
route.post('/auth/login', controller.login);
route.post('/bucketlists', verifyToken,(req,res)=>{
	let name = req.body.bucketname;
	let now = new Date();
	let created_by = req.body.created_by;

	jwt.verify(req.token,'secretkey',(err,authData)=>{

		if(err){
			res.send(err);
		}
		else{
			let addBucket = new createBucket({
				name:name,
				date_created:dateformat(now,'dddd,mmmm dS,yyyy'),
				date_modified:dateformat(now,'dddd,mmmm dS,yyyy'),
				created_by:created_by
			})

			addBucket.save(function(err){
				if(err){
					res.send({
						'ErrrMessage':err
					})

				}
				else{
					res.send({
						'message': 'BucketList Successfully Created'
					})
				}
			})

		

		}
		
	})
	

})

route.get('/bucketlists',controller.getBucketList);

route.get('/bucketlists/:id',controller.getBucket);
route.put('/bucketlists/:id',controller.updateBucket);
route.delete('/bucketlists/:id',controller.deleteBucket);
route.post('/bucketlists/:id/items',controller.createItemInBucket);
route.get('/bucketlists/:id', controller.getItemsInAbucket);
route.get('/bucketlists/:id/items/:item_id',controller.getparticularItemInBucket);
route.put('/bucketlists/:id/items/:item_id',controller.updateparticularItemInBucket);

module.exports = route;

