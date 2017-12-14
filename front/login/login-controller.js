angular.module ('notepad').controller ('loginController', function ($scope, $state, $http){
	// se loguer
	var loginUrl = 'http://localhost:3000/login';
	$scope.sendData = function(){
		var loginRequest = $http.post (loginUrl, {username: $scope.username , password: $scope.password});
		loginRequest.then (function (response){
			// recuperer le token
			var _token = response.data.token;
			// stoquer provisoirement le token le temps de la connection
			localStorage.setItem('Clef', _token);
			// verifier si le token est bon
			if (token) $state.go ('notepad');
			else $state.go ('newAccount');
		});
	}
	// creer un compte, aller sur la page de creation de compte
	$scope.goToAccountCreation = function(){
		$state.go ('newAccount');
	}
});