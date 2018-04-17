var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'CoinController',
		templateUrl: 'views/login.html'
	})
	$routeProvider.when('/login', {
		controller:'CoinController',
		templateUrl: 'views/login.html'
	})
	.when('/coinPurchase', {
		controller:'CoinController',
		templateUrl: 'views/list_coin.html'
	})
	.when('/coinPurchase/details/:id',{
		controller:'CoinController',
		templateUrl: 'views/coin_details.html'
	})
	.when('/coinPurchase/add',{
		controller:'CoinController',
		templateUrl: 'views/add_coin.html'
	})
	.when('/coinPurchase/edit/:id',{
		controller:'CoinController',
		templateUrl: 'views/edit_coin.html'
	})
	.when('/admin',{
		controller:'CoinController',
		templateUrl: 'views/admin_add_coin.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});