angular.module('notepad').controller('notepadController', function ($scope, $http){
	// afficher les notes
	$scope.showNotes = function(){
		var notepadUrl = 'http://localhost:3000/notepad';
		// recuperer le token, cf loginController
		var token = localStorage.getItem ('Clef');
		var notepadRequest = $http.get (notepadUrl + '?token=' + token);
		notepadRequest.then (function (response){
			// efacer les anciennes notes
			$scope.noteList =[];
			// TODO comment sont stoquees les infos dans la bdd
			console.log (response.data);
			// noteList est appelee dans la vue
			$scope.noteList = response.data.noteList;
		});
	}
	$scope.createNote = function(){
		// retrouver la date du jour
		var now = new Date();
		var day = now.toLocaleDateString();
		var hour = now.toLocaleTimeString();
		var today = day +' '+ hour;
		// recuperer l'auteur
		var author = localStorage.getItem ('Author');
		// creer l'objet
		var newNote ={
			title: $scope.title,
			content: $scope.content,
			author: author,
			dateCreation: today,
			dateUpdate: today
		};
		var newNoteRequest = $http.post (notepadUrl, newNote);
		newNoteRequest.then (function (response){
			// la nouvelle note est enregistree dans la bdd
			$scope.showNotes();
		});
	}
	// afficher les notes a l'ouverture de la page
	$scope.showNotes();
});