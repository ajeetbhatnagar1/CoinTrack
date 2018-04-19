var myApp = angular.module('myApp');

myApp.controller('CoinController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('CoinController loaded...');

	var getCoinPrice = function(i) {
	$http.get('api/getPrice/'+$scope.coinPurchaseList[i].coinName)
	  .success(function(resp) {
	  	$scope.coinPurchaseList[i].coinCurrentPrice = resp;
	  });
	}

	$scope.getCoinPurchaseList = function(){
		$scope.user = localStorage.user;
		console.log($scope.user);
		$http.get('/api/coinPurchaseByUser/'+localStorage.user).success(function(response){
			console.log(response);
			$scope.coinPurchaseList = response;
			for(var i=0;i<$scope.coinPurchaseList.length; i++){
				 getCoinPrice(i);
			}
		});
	}

	$scope.getCoinPurchase = function(){
		var id = $routeParams.id;
		$http.get('/api/coinPurchase/'+id).success(function(response){
			$scope.coinPurchase = response;
		});
	}

	$scope.getCoinPurchaseByUser = function(){
		$http.post('/api/coinPurchaseByUser/', $scope.user).success(function(response){
			$scope.coinPurchase = response;
		});
	}
	

	$scope.addCoinPurchase = function(){
		$scope.coinPurchase.user = localStorage.user;
		console.log($scope.coinPurchase);
		$http.post('/api/coinPurchase/', $scope.coinPurchase).success(function(response){
			window.location.href='#/coinPurchase';
		});
	}

	$scope.updatePurchase = function(){
		var id = $routeParams.id;
		$http.put('/api/coinPurchase/'+id, $scope.coinPurchase).success(function(response){
			window.location.href='#/coinPurchase';
		});
	}

	$scope.removePurchase = function(id){
		$http.delete('/api/coinPurchase/'+id).success(function(response){
			window.location.href='#/coinPurchase';
		});
	}

	$(document).ready(function(){
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        })
    })

	// Admin Screen Functions
	$scope.getcoinList = function(){
		$http.get('/api/coinList/').success(function(response){
			$scope.coinList = response;
		});
	}

	$scope.addCoinList = function(){
		console.log($scope.coinList);
		$http.post('/api/coinList/', $scope.coinList).success(function(response){
			$scope.success = "Well Done! added new coin "+ $scope.coinList.coiniName;
		});
	}

	//Login Register
	$scope.addUser = function(){
		$http.post('/api/user/', $scope.user).success(function(response){
			window.location.href='#/login';
		});
	}

	//Login 
	$scope.login = function(){
		$http.post('/api/login/', $scope.user).success(function(response){
			if($scope.user.username == 'admin' && $scope.user.password == "admin"){
				window.location.href='#/admin';
			} else {
				localStorage.setItem('user', $scope.user.username);
				window.location.href='#/coinPurchase';
			}
		});
	}

	$scope.logout = function(){
		window.localStorage.removeItem('user');
		window.localStorage.clear();
		window.location.href='#/login';
	}
}]);