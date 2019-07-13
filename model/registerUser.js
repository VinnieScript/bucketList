const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUser = new Schema({

	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	
	date_created:{
		type:String,
		required:true
	}

})

module.exports = registeruser = mongoose.model('registerUser',registerUser); 