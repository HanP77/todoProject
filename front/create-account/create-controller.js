angular.module ('notepad').controller ('createController', function ($scope, $state, $http){
	var loginUrl = 'http://localhost:3000/create-account';
	$scope.sendData = function(){
		$http.post (loginUrl, {username: $scope.username , password: $scope.password})
		.then (function (response){
			$state.go('login');
		});
	}
});