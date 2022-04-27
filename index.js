// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

function createEmployeeRecord(employee){
    let newObj = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
     return newObj
}

function createEmployeeRecords(employees){
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(obj, dateStamp){
    let [date, hour] = dateStamp.split(' ');
    hour = parseInt(hour)
    let type = "TimeIn";
    obj.timeInEvents.push({type, hour, date});
    return obj
}

function createTimeOutEvent(obj, dateStamp){
    let [date, hour] = dateStamp.split(' ');
    hour = parseInt(hour)
    let type = "TimeOut";
    obj.timeOutEvents.push({type, hour, date});
    return obj
}

function hoursWorkedOnDate(obj, workDate){
    let clockOut = obj.timeOutEvents
        .filter((element) => element.date === workDate)
        .map((element) => element.hour);

    let clockIn = obj.timeInEvents
        .filter((element) => element.date === workDate)
        .map((element) => element.hour);

    return (clockOut - clockIn)/100
}

function wagesEarnedOnDate(obj, date){
    return obj.payPerHour * hoursWorkedOnDate(obj, date)
}

function allWagesFor(obj){
    let result = [];
    const allDates = obj.timeInEvents.map((element) => (element = element.date));
    for (let element of allDates) {
        result.push(wagesEarnedOnDate(obj, element));
    }
    return result.reduce((a, b) => a + b, 0)
}

function calculatePayroll(array){
    return array.map(obj => allWagesFor(obj))
    .reduce((a, b) => (a = a + b), 0)
}