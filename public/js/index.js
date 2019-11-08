var MyApp = angular.module("MyApp", ['ngRoute', 'ang-drag-drop', 'chart.js']).config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/main', {templateUrl: 'main.html', controller: 'mainCtrl'})
		.when('/admin', {templateUrl: 'admin.html', controller: 'adminCtrl'})
		.otherwise({redirectTo: '/main'});
}]);
