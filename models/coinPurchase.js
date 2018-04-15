const mongoose = require('mongoose');

// CoinPurchase Schema
const coinPurchaseSchema = mongoose.Schema({
	coin:{
		type: String,
		required: true
	},
	coinName:{
		type: String,
		required: true
	},
	userId:{
		type: String
	},
	coinCurrentPrice:{
		type: String,
	},
	coinPurchasePrice:{
		type: String,
		required: true
	},
	coinPurchaseDate:{
		type: String,
		required: true
	},
	coinUnit:{
		type: String,
		required: true
	},	
	image_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const CoinPurchase = module.exports = mongoose.model('CoinPurchase', coinPurchaseSchema);

// Get CoinPurchase
module.exports.getCoinPurchase = (callback, limit) => {
	CoinPurchase.find(callback).limit(limit);
}

// Get CoinPurchase by User Id
module.exports.getCoinPurchaseByUserId = (id, callback) => {
	CoinPurchase.findById(id, callback);
}

// Add CoinPurchase
module.exports.addCoinPurchase = (coinPurchase, callback) => {
	CoinPurchase.create(coinPurchase, callback);
}

// Update Customer
module.exports.updateCustomer = (id, coinPurchase, options, callback) => {
	var query = {_id: id};
	var update = {
		/*salutation: customer.salutation,
		firstName: customer.firstName,
		secondName: customer.secondName,
		nricfin: customer.nricfin,
		contactNumber: customer.contactNumber,
		emailAddress: customer.emailAddress,
		nationality: customer.nationality,
		image_url: customer.image_url*/
	}
	CoinPurchase.findOneAndUpdate(query, update, options, callback);
}

// Remove Coin Purchase
module.exports.removeCoinPurchase = (id, callback) => {
	var query = {_id: id};
	CoinPurchase.remove(query, callback);
}
