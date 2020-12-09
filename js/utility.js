const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z][a-zA-Z ]{2,}$');
    if (!nameRegex.test(name)) throw "Name should start with upper-case and have atleast 3 alphabets!";
}

const checkStartDate = (startDate) => {
    let now = Date.now();
    if (Date.parse(startDate) > now) throw "Start Date is a Future Date!";
    let diff = (Math.abs(Date.parse(startDate) - now)) / (1000 * 60 * 60 * 24);
    if (diff > 30) throw "Start Date is beyond 30 Days!";
}

const stringifyDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(Date.parse(date)).toLocaleDateString("en-IN", options);
}