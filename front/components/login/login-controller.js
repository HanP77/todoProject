angular.module ('notepad').controller ('loginController', function ($scope, $state, $http){
	$scope.sendData = _sendData;
	$scope.goToAccountCreation = _goToAccountCreation;

	var loginUrl = 'http://localhost:3000/login';

	function _sendData(){

		console.log($scope.username);
		console.log($scope.password);
	
		$http.post(loginUrl, {username: $scope.username , password: $scope.password}).then(function (response){
			// var idUser = response.data.idUser;
			var token = response.data.token[0];
			var userId = response.data.userId;
			// console.log(token)
			localStorage.setItem('Clef', token);
			localStorage.setItem('author', userId);
			
			
			if (token) $state.go ('notepad');
			else $state.go ('newAccount');
		}, function(error) {
			console.log('error here', error)
		});
	}
	// creer un compte, aller sur la page de creation de compte
	function _goToAccountCreation(){
		$state.go ('newAccount');
	}
});