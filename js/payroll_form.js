window.addEventListener('DOMContentLoaded', (event) => {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });

    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const startDate = document.querySelector('#startDate');
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    const dateError = document.querySelector('.date-error');
    startDate.addEventListener('input', function() {
        try {
            (new EmployeePayrollData()).startDate = new Date(Date.UTC(year.value, month.value, day.value));
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    });
});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
    } catch (e) {
        return;
    }
};

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profileImage = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    employeePayrollData.notes = getInputValueById('#notes');
    alert(employeePayrollData.toString());
    return employeePayrollData;
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
};

/*
 * 1: querySelector is the newer feature.
 * 2: The querySelector method can be used when selecting by element name, nesting, or class name.
 * 3: querySelector lets you find elements with rules that can't be expressed with getElementById. 
 */
const getInputValueById = (id) => {
    return document.querySelector(id).value;
};

/*
 * 1: getElementById is better supported than querySelector in olderversions of the browsers.
 * 2: The thing with getElementById is that it only allows to select an element by its id.
 */
const getInputElementValue = (id) => {
    return document.getElementById(id).value;
};