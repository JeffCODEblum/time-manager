function HourManager() {
	this.scopeDataModel;
	this.hours = [];
	this.newHourBuffer = [];
	this.deleteHourBuffer = [];

	this.link = function(scopeDataModel) {
		this.scopeDataModel = scopeDataModel;
	}
	this.loadData = function(hours) {
		this.hours = hours;
	}
	this.newHour = function(hour) {
		this.newHourBuffer.push(hour);
	}
	this.deleteHour = function(hourSlot) {
		var oldHour = {
			date: new Date(hourSlot.date),
			owner: this.scopeDataModel.peopleManager.selectedPerson.name,
			time: hourSlot.text,
			job: hourSlot.job.name
		};
		this.deleteHourBuffer.push(oldHour);
		hourSlot.job = false;
	}
}