angular.module ('notepad').controller ('createController', function ($scope, $state, $http){
	var loginUrl = 'http://localhost:3000/create-account';
	$scope.sendData = function(){
		var loginRequest = $http.post (loginUrl, {username: $scope.username , password: $scope.password});
		loginRequest.then (function (response){
			$state.go('login');
		});
	}
});