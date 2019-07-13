const registerUser = require('../model/registerUser');
const dateformat = require('dateformat');
const jwt = require('jsonwebtoken');
const createBucket = require('../model/createBucket');
const uuid = require('uuid');


function isEmpty(obj){

	return !obj || Object.keys(obj).length=== 0;
}


exports.index = function(req,res){

	res.send('Welcome to BucketList');

}

exports.register = function(req,res){

	let username = req.body.username;
	let password = req.body.password;
	let now = new Date();

	registerUser.findOne({username:username},function(err,found){
		if(err){
			res.send('An Internal Error Jst Occurred...RegisterUser');
		}
		else if(isEmpty(found)){
			let addUser = new registerUser({
				username:username,
				password:password,
				date_created:dateformat(now,'dddd,mmmm dS,yyyy')
			})

			addUser.save(function(err){
				if(err){
					res.send(err+'Occurred While Commiting Registration Details');
				}
				else{
					res.send('Registration Details Successfully Saved');
				}
			})

		}
		else if(!isEmpty(found)){
			res.send('Username Already Exist');
		}

	})



}


exports.login = function(req,res){

	let username = req.body.username;
	let password = req.body.password;
	registerUser.findOne({$and:[{username:username},{password:password}]},function(err,success){
		if(err){
			res.send({
				'ErrorMessage':'An Error Just Occurred'
			})
		}
		else if(isEmpty(success)){
			res.send({
				'message':'Invalid Username or Password..pls Register',
				'registrationLink':'/register',
				'details':'username and password'
			})

		}
		else if(!isEmpty(success)){
			const user = {
				id:success._id,
				username:success.username
			}
			jwt.sign({user},'secretkey',(err,token)=>{

				res.json({
					token
				})

			})

			
		}
	})

}


exports.getBucketList = function(req,res){
createBucket.find({}, function(err,buckets){
	if(err){
		res.send({
			'ErrorMessage':err
		})
	}
	else if(isEmpty(buckets)){
		res.send({
			'Message':'No Bucket Found'
		})
	}
	else if(!isEmpty(buckets)){
		res.send({
			'Buckets':buckets
		})
	}
})

}

exports.getBucket = function(req,res){

	createBucket.findOne({_id:req.params.id}, function(err,found){
		if(err){
			res.send({
				'Error':err
			})
		}
		else if(isEmpty(found)){
			res.send({
				'Message':'Bucket not Found'
			})

		}
		else if(!isEmpty(found)){
			res.send({
				'Bucket':found
			})
		}
	})
	
}

exports.updateBucket= function(req,res){

	createBucket.findByIdAndUpdate(req.params.id,{$set:req.body},function(err,updated){
		if(err){
			res.send({
				'ErrorMsg':err
			})
		}
		else{
			res.send({
				'Message':'BucketUpdated'
			})
		}
	})
}

exports.deleteBucket = function(req,res){
	createBucket.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.send({
				'ErrorMsg':err
			})
		}
		else{
			res.send({
				'Message':'Bucket Has been Removed'
			})
		}
	})
}

exports.createItemInBucket = function(req,res){
	createBucket.findOne({_id:req.params.id},function(err,bucketFound){
		if(err){
			res.send({
				'ErrorMsg':err
			})
		}
		else if(isEmpty(bucketFound)){
			res.send({
				'Message':'Invalid BucketId'
			})
		}
		else if(!isEmpty(bucketFound)){
			let now = new Date();

			addItem = {name:req.body.Itemname,date_created:dateformat(now,'dddd,mmmm dS,yyyy'),date_modified:dateformat(now,'dddd,mmmm dS,yyyy'),done:true}

			createBucket.findByIdAndUpdate(req.params.id,{$push:{items:addItem}},function(err,doc){
				if(err){
					res.send({
						'ErrorMsg':err
					})
				}
				else{
					res.send({
						'Message':'Item has been Saved In Bucket'
					})
				}
			})
			//createBucket.items = addItem;
			//createBucket.markModified('items');
			

		}
	})
}

exports.getItemsInAbucket = function(req,res){
	createBucket.findOne({_id:req.params.id},function(err,foundBucket){
		if(err){
			res.send({
				'ErrorMsg':err
			})
		}
		else if(!isEmpty(foundBucket)){

			res.send({
				'Bucket Items':foundBucket.items
			})

		}
		else if(isEmpty(foundBucket)){
			res.send({
				'Message':'Invalid BucketId'
			})
		}
	})
}

exports.getparticularItemInBucket = function(req,res){
	createBucket.findOne({_id:req.params.id},function(err,foundBucket){
		if(err){
			res.send({
				'ErrorMsg':err
			})
		}
		else if(!isEmpty(foundBucket)){
			itemId = req.params.item_id;
			found = foundBucket.items.filter(function(hero){
					return hero._id == itemId
			})
			res.send({
				'BucketItems':found
				
			})
			

		}
		else if(isEmpty(foundBucket)){
			res.send({
				'Message':'Invalid BucketId'
			})
		}
	})
}

exports.updateparticularItemInBucket =  function(req,res){

createBucket.findOneAndUpdate({_id:req.params.id}, {$pull: {'items._id': req.params.item_id}}, function(err, data){
        if(err) {
          return res.status(500).json({'error' : 'error in deleting address'});
        }

        res.json(data);

      });



	//createBucket.findOne({_id:req.params.id},function(err,foundBucket){
	//	if(err){
	//		res.send({
	//			'ErrorMsg':err
	//		})
	//	}
	//	else if(!isEmpty(foundBucket)){
	//		itemId = req.params.itemId;
	//		found = foundBucket.items.filter(function(hero){
	//				return hero._id == itemId
	//		})

			//for (i = 0; i < found.length; i++){
              // found[i]["name"] = req.body.itemname;
       			//}


       			/*
			createBucket.findByIdAndUpdate(req.params.id,{$push:{items:found}},function(err,doc){
				if(err){
					res.send({
						'ErrorMsg':err
					})
				}
				else{
					res.send({
						'Message':'Item has been Updated In Bucket'
					})
				}
			})
			*/
			

		//}
		//else if(isEmpty(foundBucket)){
		//	res.send({
		//		'Message':'Invalid BucketId'
		//	})
		//}
	//})
}