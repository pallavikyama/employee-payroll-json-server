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
        let now = Date.now();
        if (Date.parse(startDate) > now) throw 'Start Date is a Future Date!';
        let diff = (Math.abs(Date.parse(startDate) - now)) / (1000 * 60 * 60 * 24);
        if (diff > 30) throw 'Start Date is beyond 30 Days!';
        this._startDate = startDate;
    }

    get notes() { return this._notes; }
    set notes(notes) { this._notes = notes; }

    // method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : new Date(Date.parse(this.startDate)).toLocaleDateString("en-IN", options);
        return `ID = ${this.id}\nName = ${this.name}\nProfile-image = ${this.profileImage}\nGender = ${this.gender}\nDepartment = ${this.department}\nSalary = ${this.salary}\nStart-date = ${empDate}\nNotes = ${this.notes}`;
    }
}