const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createBucket = new Schema({

	name:{
		type:String,
		required:true
	},
	items:[
			{
				id:String,
				name:String,
				date_created:String,
				date_modified:String,
				done:Boolean
			}
	],
	date_created:{
		type:String,
		required:true
	},
	date_modified:{
		type:String,
		required:true
	},
	created_by:{
		type:String,
		required:true
	}



})

module.exports = createbucket= mongoose.model('createBucket',createBucket); 