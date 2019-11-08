MyApp.controller('mainCtrl', function($scope, $http) {

	$scope.year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	$scope.hourData = [];

	$scope.dataModel = {
		view: "none",
		calendar: new Calendar(),
		peopleManager: new PeopleManager(),
		jobManager: new JobManager(),
		hourManager: new HourManager(),
		dataAgregator: new DataAgregator()
	};
	$scope.dataModel.calendar.link($scope.dataModel);
	$scope.dataModel.peopleManager.link($scope.dataModel);
	$scope.dataModel.jobManager.link($scope.dataModel);
	$scope.dataModel.hourManager.link($scope.dataModel);
	$scope.dataModel.dataAgregator.link($scope.dataModel);
	
	$scope.onDrop = function(job, hourSlot) {
		hourSlot.job = job;
		var hourData = {
			date: new Date(hourSlot.date),
			owner: $scope.dataModel.peopleManager.selectedPerson.name,
			time: hourSlot.text,
			job: job.name
		};
		if (hourSlot.job == false) {
			job.remainingHours--;
			$scope.dataModel.hourManager.newHour(hourData);
		}
		else {
			var oldHour = {
				date: new Date(hourSlot.date),
				owner: $scope.dataModel.peopleManager.selectedPerson.name,
				time: hourSlot.text,
				job: hourSlot.job.name
			};
			job.remainingHours++;
			$scope.dataModel.hourManager.deleteHour(oldHour);
			$scope.dataModel.hourManager.newHour(hourData);
		}
	};

	$scope.refresh = function() {
		$scope.pushToServer();
		$scope.pushToServer();
	}

	$scope.pushToServer = function() {
		$http.post('deleteHours', {hours: $scope.dataModel.hourManager.deleteHourBuffer});
		$scope.dataModel.hourManager.deleteHourBuffer = [];
		$http.post('newHours', {hours: $scope.dataModel.hourManager.newHourBuffer});
		$scope.dataModel.hourManager.newHourBuffer = [];
	};

	$scope.updateModels = function() {
		$http.post('getSchedule').then(function(data) {
			$scope.dataModel.hourManager.loadData(data.data);
		});

		$http.post('getPeople').then(function(data) {
			$scope.dataModel.peopleManager.loadData(data.data);
		});

		$http.post('getJobs').then(function(data) {
			$scope.dataModel.jobManager.loadData(data.data);
		});
		$scope.dataModel.calendar.setCalendar();
		$scope.dataModel.dataAgregator.update();
	}
	$scope.updateModels();
		
	$scope.setView = function(view) {
		$scope.dataModel.view = view;
		$scope.updateModels();
	}

	$scope.pickPerson = function(person) {
		$scope.dataModel.peopleManager.selectPerson(person);
		$scope.setView('year');
		$scope.updateModels();
	}

	$scope.pickMonth = function(month) {
		var monthIndex = $scope.year.indexOf(month);
		$scope.dataModel.calendar.startDate.setMonth(monthIndex);
		$scope.setView('month');
		$scope.updateModels();
	}

	$scope.pickWeek = function(week) {
		$scope.setView('week');
		$scope.dataModel.calendar.pickWeek(week);
		$scope.updateModels();
	}

});