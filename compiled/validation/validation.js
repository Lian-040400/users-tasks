"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlDate = exports.dataChecker = void 0;
function dataChecker(data) {
    if ((data.name !== "") && (data.firstName !== "") && (data.email !== "") && (data.date !== "")) {
        if (validateEmail(data.email)) {
            return data;
        }
        else {
            alert("Must be email!!!!");
        }
    }
    else {
        alert("All field are requaired!!!!");
    }
}
exports.dataChecker = dataChecker;
function controlDate(addModalDate) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    addModalDate.setAttribute("min", "1890-01-01");
    addModalDate.setAttribute("max", "" + date);
}
exports.controlDate = controlDate;
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
