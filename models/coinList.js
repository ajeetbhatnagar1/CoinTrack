const mongoose = require('mongoose');

// CoinList Schema
const coinListSchema = mongoose.Schema({
	coin:{
		type: String,
		required: true
	},
	coinName:{
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
});

const CoinList = module.exports = mongoose.model('CoinList', coinListSchema);

// Get CoinList
module.exports.getCoinList = (callback, limit) => {
	CoinList.find(callback).limit(limit).select({ coin: 1, coinName: 1, image_url :1, _id:0 });
}

// Add CoinList
module.exports.addCoinList = (coinList, callback) => {
	CoinList.create(coinList, callback);
}
