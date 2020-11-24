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
        if (startDate <= new Date())
            this._startDate = startDate;
    }

    get notes() { return this._notes; }
    set notes(notes) { this._notes = notes; }

    // method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return `id=${this.id}, name=${this.name}, profile-image=${this.profileImage}, gender=${this.gender}, department=${this.department}, salary=${this.salary}, startDate=${empDate}, notes=${this.notes}`;
    }
}