function Calendar() {
	this.month = "";

	this.today = new Date();
	this.today.setHours(0,0,0,0);
	this.startDate = new Date();
	this.startDate.setHours(0,0,0,0);
	this.endDate = new Date();
	this.endDate.setHours(0,0,0,0);

	this.weeks = [];
	this.selectedWeek = false;

	this.scopeDataModel;
	this.link = function(scopeDataModel) {
		this.scopeDataModel = scopeDataModel;
	}

	for (var i = 0; i < 6; i++) {
		this.weeks.push([]);
		for (var j = 0; j < 5; j++) {
			var slot = new Slot();
			for (var k = 0; k < 9; k++) {
				var hourSlot = new HourSlot();
				if (k < 5) {
					hourSlot.text = (k + 8) + ":30 - " + (k + 9) + ":30";
				}
				else {
					hourSlot.text = (k - 4) + ":30 - " + (k - 3) + ":30";
				}
				hourSlot.calendar = this;
				slot.hours.push(hourSlot);
			}
			this.weeks[i].push(slot);
		}
	}

	this.pickWeek = function(week) {
		this.selectedWeek = week;
	}

	this.setCalendar = function() {
		// set up start date and end date for chosen month
		this.startDate.setDate(1);
		this.endDate = new Date(this.startDate);
		if (this.startDate.getDay() == 0) {
			this.startDate.setDate(2);
		}
		else if (this.startDate.getDay() == 6) {
			this.startDate.setDate(3);
		}

		var tempDate = new Date(this.startDate);
		var i = 1;
		while (tempDate.getMonth() == this.startDate.getMonth()) {
			tempDate.setDate(i);
			if (tempDate.getMonth() == this.startDate.getMonth()) {
				this.endDate.setDate(i);
			}
			i++;
		}

		// initialize slots
		for (var i = 0; i < this.weeks.length; i++) {
			for (var j = 0; j < this.weeks[i].length; j++) {
				this.weeks[i][j].reset();
			}
		}

		// configure slots
		var dateIndex = 1;
		tempDate = new Date(this.startDate);
		var index = this.startDate.getDate();
		for (var i = 0; i < this.weeks.length; i++) {
			for (var j = 0; j < this.weeks[i].length; j++) {
				if (index > this.endDate.getDate()) {
					break;
				}
				if (i == 0 && j == 0) {
					j += this.startDate.getDay() - 1;
				}
				var slot = this.weeks[i][j];
				slot.number = index;
				tempDate.setDate(index);
				slot.date = new Date(tempDate);
				slot.text = this.parseDate(tempDate);
				for (var k = 0; k < slot.hours.length; k++) {
					slot.hours[k].date = new Date(tempDate);
				}
				
				// load data from database into calendar slots
				for (var k = 0; k < this.scopeDataModel.hourManager.hours.length; k++) {
					var loadedHour = this.scopeDataModel.hourManager.hours[k];
					//console.log(loadedHour);
					if (loadedHour.owner == this.scopeDataModel.peopleManager.selectedPerson.name) {
						//console.log("matched person");
						var formattedDate = new Date(loadedHour.date);
						formattedDate.setHours(0, 0, 0, 0);
						if (formattedDate.getTime() == slot.date.getTime()) {
							//console.log("matched date");
							// add to hour slot of this date slot
							for (var l = 0; l < slot.hours.length; l++) {
								if (loadedHour.time == slot.hours[l].text) {
									//console.log("matched time");
									// match
									for (var m = 0; m < this.scopeDataModel.jobManager.jobs.length; m++) {
										var jobModel = this.scopeDataModel.jobManager.jobs[m];
										if (loadedHour.job == jobModel.name) {
											//console.log("matched job");
											slot.hours[l].job = jobModel;
											slot.hours[l].owner = loadedHour.owner;
										}
									}
								}
							}
						}
					}
				}

				index++;
			}
			index += 2;
		}
		
		switch(this.startDate.getMonth()) {
			case 0:
				this.month = "January";
				break;
			case 1:
				this.month = "February";
				break;
			case 2:
				this.month = "March";
				break;
			case 3:
				this.month = "April";
				break;
			case 4:
				this.month = "May";
				break;
			case 5:
				this.month = "June";
				break;
			case 6:
				this.month = "July";
				break;
			case 7:
				this.month = "August";
				break;
			case 8:
				this.month = "September";
				break;
			case 9:
				this.month = "October";
				break;
			case 10:
				this.month = "November";
				break;
			case 11:
				this.month = "December";
				break;
		}
	}
	this.parseDate = function(date) {
		var string = "";
		switch (date.getDay()) {
			case 1:
				string += "Mon, ";
				break;
			case 2:
				string += "Tue, ";
				break;
			case 3:
				string += "Wed, ";
				break;
			case 4:
				string += "Thu, ";
				break;
			case 5:
				string += "Fri, ";
				break;
			case 6:
				string += "Sat, ";
				break;
			case 0:
				string += "Sun, ";
				break;
		}
	
		switch (date.getMonth()) {
			case 0:
				string += "January";
				break;
			case 1:
				string += "February";
				break;
			case 2:
				string += "March";
				break;
			case 3:
				string += "April";
				break;
			case 4:
				string += "May";
				break;
			case 5:
				string += "June";
				break;
			case 6:
				string += "July";
				break;
			case 7:
				string += "August";
				break;
			case 8:
				string += "September";
				break;
			case 9:
				string += "October";
				break;
			case 10:
				string += "November";
				break;
			case 11:
				string += "December";
				break;
		}

		string += (" " + date.getDate() + ", ");
		string += (" " + date.getFullYear());
		return string;
	}
}

function Slot() {
	this.text = "";
	this.number = 0;
	this.date = new Date();
	this.state = 0;
	this.hours = [];

	this.reset = function() {
		this.text = "";
		this.number = 0;
		this.date = new Date();
		this.state = 0;
		for (var i = 0; i < this.hours.length; i++) {
			var hour = this.hours[i];
			hour.job = false;
		}
	}
}

function HourSlot() {
	this.date = new Date();
	this.owner = "";
	this.calendar;
	this.text = "default";
	this.job = false;
}
