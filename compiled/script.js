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
var addModal = document.querySelector('#add-modal');
var editModal = document.querySelector('#edit-modal');
var editModalAdd = document.querySelector('#edit-modal-edit');
var addModalDate = document.getElementById("add-date-input");
var addModalEmail = document.getElementById("add-email-input");
var addModalName = document.getElementById("add-name-input");
var addModalFirstName = document.getElementById("add-firstName-input");
var editModalName = document.getElementById("edit-name-input");
var editModalFirstName = document.getElementById("edit-firstName-input");
var editModalDate = document.getElementById("edit-date-input");
var editModalEmail = document.getElementById("edit-email-input");
var addUserForm = document.getElementById('add-user-form');
start();
function start() {
    var addUsersElement = document.querySelector('.add-users');
    var addModalCancel = document.querySelector('#add-modal-cancel');
    var addModalAdd = document.querySelector('#add-modal-add');
    var editModalCancel = document.querySelector('#edit-modal-cancel');
    getUsers();
    controlDate();
    addUsersElement.addEventListener("click", function () { return openModal('add'); });
    addModalCancel.addEventListener("click", function () { return cancelModal('add'); });
    addModalAdd.addEventListener("click", addUser);
    editModalCancel.addEventListener("click", function () { return cancelModal('edit'); });
}
function getUsers() {
    fetch('http://localhost:9000/users')
        .then(function (response) { return response.json(); })
        .then(function (users) {
        users.forEach(function (user) {
            createUserCard(user);
        });
    })
        .catch(function () {
        document.body.innerHTML = "<h1 style='color: red'>Somethins is wrong !!!</h1>";
    });
}
function controlDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    addModalDate.setAttribute("min", "1890-01-01");
    addModalDate.setAttribute("max", "" + date);
}
function openModal(type) {
    var modal = type === 'add' ? addModal : editModal;
    modal.classList.add("show");
}
function cancelModal(type) {
    var modal = type === 'add' ? addModal : editModal;
    modal.classList.remove("show");
    addUserForm.reset();
}
function addUser() {
    var data = getDataFromForm('add');
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
function getDataFromForm(type) {
    var data;
    if (type === "add") {
        data = {
            name: addModalName.value,
            firstName: addModalFirstName.value,
            email: addModalEmail.value,
            date: addModalDate.value
        };
    }
    else {
        data = {
            name: editModalName.value,
            firstName: editModalFirstName.value,
            email: editModalEmail.value,
            date: editModalDate.value
        };
    }
    return dataChecker(data);
}
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
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
function removeUserFromDB(userId) {
    return fetch("http://localhost:9000/users/" + userId, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
    });
}
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
function createUserCard(data) {
    var users = document.querySelector(".users");
    var user = document.createElement("div");
    var userdata = document.createElement("div");
    var cardButtons = document.createElement("div");
    var edit = document.createElement("div");
    var remove = document.createElement("div");
    var age = document.createElement("h2");
    var name = document.createElement("span");
    var firstName = document.createElement("span");
    var email = document.createElement("p");
    user.classList.add("user-card");
    user.id = "user-card-" + data.id;
    userdata.classList.add("user-data");
    cardButtons.classList.add("card-buttons");
    edit.classList.add("edit");
    remove.classList.add("remove");
    var dateNow = (new Date).getFullYear();
    var year = parseFloat(data.date);
    var userAge = dateNow - year;
    age.innerText = userAge.toString();
    name.innerText = data.name;
    firstName.innerText = data.firstName;
    email.innerText = data.email;
    remove.innerText = 'Delete';
    edit.innerText = 'Edit';
    cardButtons.appendChild(remove);
    cardButtons.appendChild(edit);
    userdata.appendChild(age);
    userdata.appendChild(name);
    userdata.appendChild(firstName);
    userdata.appendChild(email);
    user.appendChild(userdata);
    user.appendChild(cardButtons);
    users.appendChild(user);
    remove.addEventListener('click', function () { return deleteUserCard(user, data.id); });
    edit.addEventListener('click', function () { return editUserCard(data); });
}
function deleteUserCard(user, id) {
    removeUserFromDB(id)
        .then(function () {
        user.remove();
    });
}
function editUserCard(data) {
    openModal('edit');
    editModalName.value = data.name;
    editModalFirstName.value = data.firstName;
    editModalEmail.value = data.email;
    editModalDate.value = data.date;
    var id = data.id;
    editModalAdd.addEventListener('click', function () {
        var editData = __assign({ id: id }, getDataFromForm('edit'));
        editUserFromDB(editData);
    });
}
