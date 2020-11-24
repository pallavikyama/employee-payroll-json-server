const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function() {
    output.textContent = salary.value;
});

class EmployeePayrollData {

    // constructor
    constructor(...params) {
        this.name = params[0];
        this.profileImage = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.startDate = params[5];
        this.notes = params[6];
    }

    // getter and setter method

    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z][a-z]{2,}$');
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
    set salary(salary) {
        if (salary > 0)
            this._salary = salary;
        else throw 'Salary is invalid!';
    }

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
        return `name=${this.name}, profile-image=${this.profileImage}, gender=${this.gender}, department=${this.department}, salary=${this.salary}, startDate=${empDate}, notes=${this.notes}`;
    }
}

function save() {
    let empName = document.querySelector('#name').value;
    let imageNodeList = document.querySelectorAll('input[name="profile"]');
    let empProfileImage;
    for (let image of imageNodeList) {
        if (image.checked) {
            empProfileImage = image.value;
            break;
        }
    }
    let genderNodeList = document.querySelectorAll('input[name="gender"]');
    let empGender;
    for (let gender of genderNodeList) {
        if (gender.checked) {
            empGender = gender.value;
            break;
        }
    }
    let departmentNodeList = document.querySelectorAll('.checkbox:checked');
    let empDepartment = new Array();
    for (let department of departmentNodeList) {
        if (department.checked) {
            empDepartment.push(department.value);
        }
    }
    let empSalary = document.querySelector('#salary').value;
    let day = document.querySelector('#day').value;
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;
    let empStartDate = new Date(year, month, day);
    let empNotes = document.querySelector('#notes').value;
    try {
        let employeePayrollData = new EmployeePayrollData(empName, empProfileImage, empGender, empDepartment, empSalary, empStartDate, empNotes);
        console.log(employeePayrollData.toString());
    } catch (e) {
        console.error(e);
    }
}