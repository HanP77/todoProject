angular.module ('notepad').config (function ($stateProvider, $urlRouterProvider){
	var forLogin ={
		name: 'login',
		url: '/login',
		template: '<login></login>'
	};
	var newAccount ={
		name: 'newAccount',
		url: '/create-account',
		template: '<create></create>'
	};
	var notepad ={
		name: 'notepad',
		url: '/notepad',
		template: '<notepad></notepad>'
	};

	$stateProvider.state (forLogin);
	$stateProvider.state (newAccount);
	$stateProvider.state (notepad);
	
	$urlRouterProvider.otherwise ('/login');
});