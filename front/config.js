// liste des vues
angular.module ('notepad').config (function ($stateProvider, $urlRouterProvider){
	var forLogin ={
		name: 'login',
		url: '/login',
		template: '<login></login>'
	};
	var newAccount ={
		name: 'newAccount',
		url: '/create-account',
		template: '<newcount></newcount>'
	};
	var notepad ={
		name: 'notepad',
		url: '/notepad',
		template: '<notepad></notepad>'
	};
	// creer les pages
	$stateProvider.state (forLogin);
	$stateProvider.state (newAccount);
	$stateProvider.state (notepad);
	// page par defaut
	$urlRouterProvider.otherwise (forLogin);
});