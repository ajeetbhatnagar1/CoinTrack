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
	user:{
		type: String,
		required: true
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
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
},{ autoIndex: false});

const CoinPurchase = module.exports = mongoose.model('CryptoCoinPurchase', coinPurchaseSchema);

// Get CoinPurchase
module.exports.getCoinPurchase = (callback, limit) => {
	CoinPurchase.find(callback).limit(limit);
}

// Get CoinPurchase by User Id
module.exports.getCoinPurchaseById = (id, callback) => {
	CoinPurchase.findById(id, callback);
}


module.exports.getCoinPurchaseByUser = (user, callback) => {
	CoinPurchase.find({user : user}, callback);
}

// Add CoinPurchase
module.exports.addCoinPurchase = (coinPurchase, callback) => {
	CoinPurchase.create(coinPurchase, callback);
}

// Update Customer
module.exports.updateCoinPurchase = (id, coinPurchase, options, callback) => {
	var query = {_id: id};
	var update = {
		coin: coinPurchase.coin,
		coinName: coinPurchase.coinName,
		coinPurchasePrice: coinPurchase.coinPurchasePrice,
		coinPurchaseDate: coinPurchase.coinPurchaseDate,
		coinUnit: coinPurchase.coinUnit,
		image_url: coinPurchase.image_url
	}
	CoinPurchase.findOneAndUpdate(query, update, options, callback);
}

// Remove Coin Purchase
module.exports.removeCoinPurchase = (id, callback) => {
	var query = {_id: id};
	CoinPurchase.remove(query, callback);
}
