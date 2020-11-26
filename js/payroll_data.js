class EmployeePayrollData {

    // getter and setter methods
    get id() { return this._id; }
    set id(id) { this._id = id; }

    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z][a-zA-Z ]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is invalid!';
    }

    get profileImage() { return this._profileImage; }
    set profileImage(profileImage) { this._profileImage = profileImage; }

    get gender() { return this._gender; }
    set gender(gender) { this._gender = gender; }

    get department() { return this._department; }
    set department(department) { this._department = department; }

    get salary() { return this._salary; }
    set salary(salary) { this._salary = salary; }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        const date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        if (Date.parse(date) <= Date.now()) {
            this._startDate = startDate;
        } else throw 'Start date is invalid!';
    }

    get notes() { return this._notes; }
    set notes(notes) { this._notes = notes; }

    // method
    toString() {
        const empDate = new Date(startDateFormat());
        return `ID=${this.id}, Name=${this.name}, Profile-image=${this.profileImage}, Gender=${this.gender}, Department=${this.department}, Salary=${this.salary}, Start-date=${empDate}, Notes=${this.notes}`;
    }
}