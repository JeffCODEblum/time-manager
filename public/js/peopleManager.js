function PeopleManager() {
	this.scopeDataModel;
	this.people = [];
	// dummy data
	/*
	for (var i = 0; i < 3; i++) {
		var person = new Person();
		person.name = "Person" + (i + 1);
		this.people.push(person)
	}
	*/
	this.selectedPerson = false;

	this.link = function(scopeDataModel) {
		this.scopeDataModel = scopeDataModel;
	}

	this.loadData = function(data) {
		this.people = [];
		for (var i = 0; i < data.length; i++) {
			var person = new Person();
			person.name = data[i].name;
			this.people.push(person);
		}
	}
	
	this.selectPerson = function(person) {
		this.selectedPerson = person;
	}
}
