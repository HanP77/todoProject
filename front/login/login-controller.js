angular.module ('notepad').controller ('loginController', function ($scope, $state, $http){
	// se loguer
	var loginUrl = 'http://localhost:3000/login';
	$scope.sendData = _sendData;


	function _sendData(){
		console.log($scope.username)
		$http.post(loginUrl, {username: $scope.username , password: $scope.password}).then(function (response){
			// recuperer le token
			var _token = response.data.token[0];
			console.log(_token);
			// stoquer provisoirement le token le temps de la connection
			localStorage.setItem('Clef', _token);
			// verifier si le token est bon
			if (_token) $state.go ('notepad');
			else $state.go ('newAccount');
		});
	}
	// creer un compte, aller sur la page de creation de compte
	$scope.goToAccountCreation = function(){
		$state.go ('newAccount');
	}
});