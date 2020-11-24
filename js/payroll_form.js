const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function() {
    output.textContent = salary.value;
});

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