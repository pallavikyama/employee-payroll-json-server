let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    name.addEventListener("input", function() {
        if (name.value.length == 0) {
            setTextValue(".text-error", "");
            return;
        }
        try {
            checkName(name.value);
            setTextValue(".text-error", "");
        } catch (e) {
            setTextValue(".text-error", e);
        }
    });

    const salary = document.querySelector("#salary");
    setTextValue(".salary-output", salary.value);
    salary.addEventListener("input", function() {
        setTextValue(".salary-output", salary.value);
    });

    const startDate = document.querySelector("#startDate");
    startDate.addEventListener("input", function() {
        try {
            let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
            checkStartDate(date);
            setTextValue(".date-error", "");
        } catch (e) {
            setTextValue(".date-error", e);
        }
    });

    document.querySelector("#cancelButton").href = site_properties.home_page;
    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        if (site_properties.use_local_storage.match("true")) {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        } else {
            createOrUpdateEmployeePayrollServer();
        }
    } catch (e) {
        return;
    }
};

const createOrUpdateEmployeePayrollServer = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if (isUpdate) {
        methodCall = "PUT";
        postURL = postURL + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall, postURL, true, employeePayrollObj)
        .then(() => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        })
};

const setEmployeePayrollObject = () => {
    if (!isUpdate) {
        employeePayrollObj.id = createNewEmployeeId();
    }
    employeePayrollObj._name = getInputValueById("#name");
    employeePayrollObj._profileImage = getSelectedValues("[name=profile]").pop();
    employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
    employeePayrollObj._department = getSelectedValues("[name=department]");
    employeePayrollObj._salary = getInputValueById("#salary");
    let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
    employeePayrollObj._startDate = stringifyDate(date);
    employeePayrollObj._notes = getInputValueById("#notes");
};

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
        if (!empPayrollData) {
            employeePayrollList.push(employeePayrollObj);
        } else {
            const index = employeePayrollList
                .map(empData => empData.id)
                .indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, employeePayrollObj);
        }
    } else {
        employeePayrollList = [employeePayrollObj];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
};

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked) selectedItems.push(item.value);
    });
    return selectedItems;
};

const getInputValueById = (id) => {
    return document.querySelector(id).value;
};

const setForm = () => {
    setValue("#name", employeePayrollObj._name);
    setSelectedValues("[name=profile]", employeePayrollObj._profileImage);
    setSelectedValues("[name=gender]", employeePayrollObj._gender);
    setSelectedValues("[name=department]", employeePayrollObj._department);
    setValue("#salary", employeePayrollObj._salary);
    setTextValue(".salary-output", employeePayrollObj._salary);
    let date = employeePayrollObj._startDate.split(" ");
    setValue("#day", date[0]);
    setValue("#month", date[1]);
    setValue("#year", date[2]);
    setValue("#notes", employeePayrollObj._notes);
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value == value)
            item.checked = true;
    });
};

const resetForm = () => {
    setValue("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#salary", "");
    setTextValue(".salary-output", 400000);
    setSelectedIndex("#day", 0);
    setSelectedIndex("#month", 0);
    setSelectedIndex("#year", 0);
    setValue("#notes", "");
};

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
};

const checkForUpdate = () => {
    const employeePayrollDataJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollDataJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollDataJson);
    setForm();
};