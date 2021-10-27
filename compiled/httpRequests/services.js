"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.editUserFromDB = exports.removeUserFromDB = exports.getUsers = void 0;
function getUsers() {
    return fetch('http://localhost:9000/users')
        .then(function (response) { return response.json(); });
}
exports.getUsers = getUsers;
function removeUserFromDB(userId) {
    return fetch("http://localhost:9000/users/" + userId, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    });
}
exports.removeUserFromDB = removeUserFromDB;
function editUserFromDB(data) {
    return fetch("http://localhost:9000/users/" + data.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(__assign({}, data))
    });
}
exports.editUserFromDB = editUserFromDB;
function addUser(data) {
    if (!data) {
        return;
    }
    fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(function (response) { return response.json(); })
        .catch(function () {
        document.body.innerHTML = "<h1 style='color: red'>Somethins is wrong !!!</h1>";
    });
}
exports.addUser = addUser;
