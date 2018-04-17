const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

CoinPurchase = require('./models/coinPurchase');
CoinList = require('./models/coinList');
User = require('./models/user');


// Connect to Mongoose
mongoose.connect('mongodb://localhost/coinPurchaseDB');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/coinPurchase');
});

app.get('/api/coinPurchase', (req, res) => {
	CoinPurchase.getCoinPurchase((err, coinPurchase) => {
		if(err){
			throw err;
		} 
		res.json(coinPurchase);
	});
});

app.get('/api/getPrice/:coinName', (req, res) => {
	var coin = req.params.coinName;
	var optionsget = {
	    host : 'api.coinmarketcap.com', 
	    port : 443,
	    path : '/v1/ticker/'+coin+'/',
	    method : 'GET'
	};
	var reqGet = https.request(optionsget, function(res1) {
		res1.on('data', function(d) {
	         info = JSON.parse(d);
		     res.json(info[0].price_usd);	
	    });
	});
	reqGet.end();
});

app.get('/api/coinPurchase/:_id', (req, res) => {
	CoinPurchase.getCoinPurchaseById(req.params._id, (err, coinPurchase) => {
		if(err){
			throw err;
		}
		res.json(coinPurchase);
	});
});

app.post('/api/coinPurchase', (req, res) => {
	var coinPurchase = req.body;
	CoinPurchase.addCoinPurchase(coinPurchase, (err, coinPurchase) => {
		if(err){
			throw err;
		}
		res.json(coinPurchase);
	});
});

app.put('/api/coinPurchase/:_id', (req, res) => {
	var id = req.params._id;
	var coinPurchase = req.body;
	CoinPurchase.updateCoinPurchase(id, coinPurchase, {}, (err, coinPurchase) => {
		if(err){
			throw err;
		}
		res.json(coinPurchase);
	});
});

app.delete('/api/coinPurchase/:_id', (req, res) => {
	var id = req.params._id;
	CoinPurchase.removeCoinPurchase(id, (err, coinPurchase) => {
		if(err){
			throw err;
		}
		res.json(coinPurchase);
	});
});

app.get('/api/coinList', (req, res) => {
	CoinList.getCoinList((err, coinList) => {
		if(err){
			throw err;
		} 
		res.json(coinList);
	});
});

app.post('/api/coinList', (req, res) => {
	var coinList = req.body;
	CoinList.addCoinList(coinList, (err, coinList) => {
		if(err){
			throw err;
		}
		res.json(coinList);
	});
});


// login api
app.post('/api/user', (req, res) => {
	var user = req.body;
	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		return res.status(200).send();
	});
});

// get user
app.post('/api/login', (req, res) => {
	var user = req.body;
	User.getUser(user, (err, user) => {
		if(err){
			throw err;
		}
		if(user == null){
			return res.status(401).send();
		}
		return res.status(200).send();
	});
});

// Node Server 
app.listen(3000);
console.log('Running on port 3000...');
