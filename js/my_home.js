window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

// Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let empParollList = createEmployeePayrollJSON();
    for (const empParollData of empParollList) {
        innerHtml = `${innerHtml}
          <tr>
            <td><img class="profile" alt="" src="${empParollData._profilePic}"></td>
            <td>${empParollData._name}</td>
            <td>${empParollData._gender}</td>
            <td>${getDeptHtml(empParollData._department)}</td>
            <td>${empParollData._salary}</td>
            <td>${empParollData._startDate}</td>
            <td>
              <img id="${empParollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
              <img id="${empParollData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
            </td>
          </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [{
            _name: 'Pallavi Kyama',
            _gender: 'Female',
            _department: ['Finance', 'Engineer', 'HR'],
            _salary: '500000',
            _startDate: '26 Nov 2020',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -4.png'
        },
        {
            _name: 'Narayan Mahadevan',
            _gender: 'Male',
            _department: ['Engineer', 'Finance'],
            _salary: '490000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Amarpa Shashanka Keerthi Kumar',
            _gender: 'Female',
            _department: ['Sales'],
            _salary: '400000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
};

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
};