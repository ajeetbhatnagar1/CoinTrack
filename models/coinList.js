const mongoose = require('mongoose');

// CoinList Schema
const coinListSchema = mongoose.Schema({
	coin:{
		type: String,
		required: true
	},
	coinName:{
		type: String
	},
	image_url:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const CoinList = module.exports = mongoose.model('CoinList', coinListSchema);

// Get CoinList
module.exports.getCoinList = (callback, limit) => {
	CoinList.find(callback).limit(limit);
}

// Add CoinList
module.exports.addCoinList = (coinList, callback) => {
	CoinList.create(coinList, callback);
}
