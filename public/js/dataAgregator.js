function DataAgregator() {

	this.jobTotals = [];
	this.scopeDataModel;
	this.link = function(scopeDataModel) {
		this.scopeDataModel = scopeDataModel;
	}
	
	// month's hours
	// selected person > each job > each weeks > all slots > all hours
	var month = {
		totalWorkableHours: 0,
		
	};

	this.chartData = {
		labels: [],
		data: [],
		colors: [],
		options: {
		  responsive: false,
		  maintainAspectRatio: false
		}
	};

	this.update = function() {
		// update count for whole month
		
		// reset models
		this.jobTotals = [];
		this.chartData = {
			labels: [],
			data: [],
			colors: [],
			options: {
			  responsive: false,
			  maintainAspectRatio: false
			}
		};
	
		if (this.scopeDataModel.view == 'month') {
			var person = this.scopeDataModel.peopleManager.selectedPerson;
			for (var i = 0; i < this.scopeDataModel.jobManager.jobs.length; i++) {
				var job = this.scopeDataModel.jobManager.jobs[i];
				var jobTotal = {
					job: job,
					totalAssignedHours: 0
				};
				// Search for hours this month belonging to this person and each job
				for (var j = 0; j < this.scopeDataModel.calendar.weeks.length; j++) {
					for (var k = 0; k < this.scopeDataModel.calendar.weeks[j].length; k++) {
						var slot = this.scopeDataModel.calendar.weeks[j][k];
						for (var l = 0; l < slot.hours.length; l++) {
							var hour = slot.hours[l];
							if (hour.job != false) {
								if (hour.owner == person.name && hour.job.name == job.name) {
									// match
									jobTotal.totalAssignedHours++;
								}
							}
						}
					}
				}
				this.jobTotals.push(jobTotal);
			}
			
			// search for unassgined hours
			var unassignedTotal = {
				job: {name: "unassigned", color: "#999999"},
				totalAssignedHours: 0
			};
			for (var j = 0; j < this.scopeDataModel.calendar.weeks.length; j++) {
				for (var k = 0; k < this.scopeDataModel.calendar.weeks[j].length; k++) {
					var slot = this.scopeDataModel.calendar.weeks[j][k];
					if (slot.number != 0) {
						for (var l = 0; l < slot.hours.length; l++) {
							var hour = slot.hours[l];
							if (hour.job == false) {
								unassignedTotal.totalAssignedHours++;
							}
						}
					}
				}
			}
			this.jobTotals.push(unassignedTotal);
		}

		else if (this.scopeDataModel.view == 'week') {
			var person = this.scopeDataModel.peopleManager.selectedPerson;
			for (var i = 0; i < this.scopeDataModel.jobManager.jobs.length; i++) {
				var job = this.scopeDataModel.jobManager.jobs[i];
				var jobTotal = {
					job: job,
					totalAssignedHours: 0
				};
				// Search for hours this week belonging to this person and each job
				for (var k = 0; k < this.scopeDataModel.calendar.selectedWeek.length; k++) {
					var slot = this.scopeDataModel.calendar.selectedWeek[k];
					for (var l = 0; l < slot.hours.length; l++) {
						var hour = slot.hours[l];
						if (hour.job != false) {
							if (hour.owner == person.name && hour.job.name == job.name) {
								// match
								jobTotal.totalAssignedHours++;
							}
						}
					}
				}
				
				this.jobTotals.push(jobTotal);
			}
	
			// search for unassgined hours
			var unassignedTotal = {
				job: {name: "unassigned", color: "#999999"},
				totalAssignedHours: 0
			};
			for (var k = 0; k < this.scopeDataModel.calendar.selectedWeek.length; k++) {
				var slot = this.scopeDataModel.calendar.selectedWeek[k];
				if (slot.number != 0) {
					for (var l = 0; l < slot.hours.length; l++) {
						var hour = slot.hours[l];
						if (hour.job == false) {
							unassignedTotal.totalAssignedHours++;
						}
					}
				}
			}
			
			this.jobTotals.push(unassignedTotal);
		}
		for (var i = 0; i < this.jobTotals.length; i++) {
			this.chartData.labels.push(this.jobTotals[i].job.name);
			this.chartData.colors.push(this.jobTotals[i].job.color);
			this.chartData.data.push(this.jobTotals[i].totalAssignedHours);
		}
	}
}