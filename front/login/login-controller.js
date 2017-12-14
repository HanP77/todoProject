angular.module ('notepad').controller ('loginController', function ($scope, $state, $http){
	// se loguer
	var loginUrl = 'http://localhost:3000/login';
	$scope.sendData = _sendData;
	$scope.goToAccountCreation = _goToAccountCreation;

	function _sendData(){
		console.log($scope.username);
		console.log($scope.password);
		$http.post(loginUrl, {username: $scope.username , password: $scope.password}).then(function (response){
			// recuperer le token
			
			var token = response.data.token[0];
			// stoquer provisoirement le token le temps de la connection
			console.log(token)
			localStorage.setItem('Clef', token);
			// conserver le nom de l'utilisateur, qui est le nom d'auteur des notes
			localStorage.setItem('Author', $scope.username);
			// verifier si le token est bon
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