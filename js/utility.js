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

function makeServiceCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
                console.log(methodType + " State Change called. Ready State: " + xhr.readyState + " Status: " + xhr.status);
                if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                    resolve(xhr.responseText);
                } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("XHR Failed due to 400 Client Error or 500 Server Error.");
                }
            }
            // Any errors before loading would be checked here
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: this.statusText
            });
        };
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server.");
    });
}