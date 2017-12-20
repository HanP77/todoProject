angular.module('notepad').controller('notepadController', function ($scope, $state, $http){
	// $scope.showNotes = _showNotes();
	$scope.createNote = _createNote;
	// $scope.getNote = _getNote;
	$scope.deleteNote = _deleteNote;
	// $scope.change = _change;
	var userId = localStorage.getItem('author');
	_getNote();


	function _createNote(){
	// console.log(userId);		
	// console.log($scope.title);
	// console.log($scope.content);
		$http.post('http://localhost:3000/notepad/new', {title: $scope.title, content: $scope.content, author: userId}).then(function (response){
			console.log('Data send !');
			alert('Note crée');
			});
	}


	function _getNote(){
		console.log(userId);
		$http.get('http://localhost:3000/notepad/' + userId).then(function (response) {
			console.log(response.data.notes);
			// console.log(response.data.notes[0]._id);

			// var idNote = response.data.notes[0]._id;

			$scope.note = response.data.notes;
		}) 
	}
});


	function _deleteNote() {
		$http.post('http://localhost:3000/notepad/')
	}
	// function _change() {

	// 	$scope.newNote = {};
 //      $scope.newNote.createdOn = Date.now();
 //      $scope.newNote.text = ' ';
 //      $scope.newNote.edit = true;
 //      $scope.notes.push($scope.newNote);
 //      $scope.newNote = {};
	// }

 		

