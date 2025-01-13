// Your code here
// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

// Function to add a timeIn event
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Function to add a timeOut event
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages for all dates worked by an employee
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

// Function to calculate the total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}

// Example Usage
let employeesData = [
    ["John", "Doe", "Manager", 50],
    ["Jane", "Smith", "Developer", 40],
    ["Emily", "Jones", "Designer", 30]
];

let employees = createEmployeeRecords(employeesData);

createTimeInEvent(employees[0], "2025-01-09 0800");
createTimeOutEvent(employees[0], "2025-01-09 1600");

createTimeInEvent(employees[1], "2025-01-09 0900");
createTimeOutEvent(employees[1], "2025-01-09 1700");

createTimeInEvent(employees[2], "2025-01-09 1000");
createTimeOutEvent(employees[2], "2025-01-09 1800");

console.log("Total Payroll:", calculatePayroll(employees)); // Example Output

