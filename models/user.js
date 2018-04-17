const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const User = module.exports = mongoose.model('User', userSchema);



// get login user
module.exports.getUser = (user, callback) => {
	User.findOne({username: user.username, password: user.password}, callback);
}


// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}
