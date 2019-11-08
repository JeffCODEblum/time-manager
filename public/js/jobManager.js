var COLORS = ["#FF6666", "#66FF66", "#6666FF"];
function JobManager() {
	this.scopeDataModel;

	this.jobs = [];
	// dummy Data
	/*
	for (var i = 0; i < 3; i++) {
		var job = new Job();
		job.name = "Job" + (i + 1);
		job.color = COLORS[i];
		job.totalHours = 100;
		job.remainingHours = 100;
		this.totalJobHours += job.totalHours;
		this.totalJobHoursRemaining += job.remainingHours;
		this.jobs.push(job);
	}
	*/

	this.loadData = function(data) {
		this.jobs = [];
		for (var i = 0; i < data.length; i++) {
			var job = new Job();
			job.name = data[i].name;
			job.color = data[i].color;
			job.totalHours = data[i].totalHours;
			this.jobs.push(job);
		}
	}

	this.link = function(scopeDataModel) {
		this.scopeDataModel = scopeDataModel;
	}
}