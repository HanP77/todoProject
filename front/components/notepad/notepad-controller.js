angular.module('notepad').controller('notepadController', function ($scope, $state, $http){
    $scope.search = "";
    $scope.createNote = _createNote;
    $scope.transfert = _transfert;
    $scope.deleteNote = _deleteNote;
    $scope.clear = _clear;
    
    var userId = localStorage.getItem('author');
    _getNote();

    function _transfert(notes) {
        // console.log(notes);
        // console.log($scope.currentContent);
        $scope.noteId = notes._id;
        $scope.title = notes.title;
        $scope.content = notes.content;
        // $scope.content = $scope.currentContent;
        
    }
    function _createNote(){
            $http.post('http://localhost:3000/notepad/new', {title: $scope.title, content: $scope.content, author: userId, noteId: $scope.noteId}).then(function (response){
            console.log('Data send !');
            // console.log($scope.Id);
            _getNote();
            });
    }


    function _getNote(){
        console.log(userId);
        $http.get('http://localhost:3000/notepad/' + userId).then(function (response) {
            console.log(response.data.notes);
            $scope.note = response.data.notes;
        })
    }




    function _deleteNote() {
        $http.post('http://localhost:3000/notepad/delete', {noteId: $scope.noteId}).then(function (response){
            _getNote();
        });
    }


    function _clear() {
        $scope.title = "";
        $scope.content = "";
        $scope.noteId = "";
    }

});