angular.module('notepad').controller('notepadController', function ($scope, $state, $http){
	// $scope.showNotes = _showNotes();
	$scope.createNote = _createNote;
	
	// afficher les notes
	// function _showNotes(){
	// 	var notepadUrl = 'http://localhost:3000/notepad';
	// 	// recuperer le token, cf loginController
	// 	var token = localStorage.getItem ('Clef');
	// 	var notepadRequest = $http.get (notepadUrl + '?token=' + token);
	// 	notepadRequest.then (function (response){
	// 		// efacer les anciennes notes
	// 		$scope.noteList =[];
	// 		// TODO comment sont stoquees les infos dans la bdd
	// 		console.       log (response.data);
	// 		// noteList est appelee dans la vue
	// 		$scope.noteList = response.data.noteList;
	// 	});
	// }


	function _createNote(){

	console.log($scope.title);
	console.log($scope.content);
		$http.post('http://localhost:3000/insert', {title: $scope.title, content: $scope.content}).then(function (response){
			console.log('Data send !');
			});
	}
});