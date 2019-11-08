MyApp.controller('adminCtrl', function($scope, $http) {
	$scope.people = [];
	$scope.jobs = [];
	$scope.newPerson;
	$scope.newJob;
	$scope.newTotalHours;
	$scope.colors = ["#FF6666", "#66FF66", "#6666FF", "#FFFF66", "#FF66FF", "#66FFFF", "#AA3333", "#33AA33", "#3333AA"];
	$scope.newColor = $scope.colors[0];
	
	$scope.addPerson = function() {
		console.log($scope.newPerson);
		$http.post('newPerson', {person: $scope.newPerson});
		$scope.newPerson = null;
		$scope.getPeople();
	}

	$scope.addJob = function() {
		console.log($scope.newJob);
		var job = {
			name: $scope.newJob,
			color: $scope.newColor,
			totalHours: $scope.newTotalHours
		};
		$http.post('newJob', {job: job});
		$scope.newJob = null;
		$scope.getJobs();
	}
	
	$scope.setNewColor = function(color) {
		$scope.newColor = color;
	}

	$scope.getPeople = function() {
		$http.post('getPeople').then(function(data) {
			$scope.people = data.data;
		});
	}
	$scope.getPeople();

	$scope.getJobs = function() {
		$http.post('getJobs').then(function(data) {
			$scope.jobs = data.data;
		});
	}
	$scope.getJobs();
});