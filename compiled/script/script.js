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
var validation_1 = require("../validation/validation");
var services_1 = require("../httpRequests/services");
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
var editUserForm = document.getElementById('edit-user-form');
start();
function start() {
    var addUsersElement = document.querySelector('.add-users');
    var addModalCancel = document.querySelector('#add-modal-cancel');
    var addModalAdd = document.querySelector('#add-modal-add');
    var editModalCancel = document.querySelector('#edit-modal-cancel');
    (0, services_1.getUsers)()
        .then(function (users) {
        users.forEach(function (user) {
            createUserCard(user);
        });
    })
        .catch(function () {
        document.body.innerHTML = "<h1 style='color: red'>Somethins is wrong !!!</h1>";
    });
    (0, validation_1.controlDate)(addModalDate);
    addUsersElement.addEventListener("click", function () { return openModal('add'); });
    addModalCancel.addEventListener("click", function () { return cancelModal('add'); });
    addModalAdd.addEventListener("click", function () { return (0, services_1.addUser)(getDataFromForm('add')); });
    editModalCancel.addEventListener("click", function () { return cancelModal('edit'); });
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
function getDataFromForm(type) {
    var data;
    var currentForm = type === "add" ? addUserForm : editUserForm;
    data = {
        name: currentForm['name'].value,
        firstName: currentForm['firstname'].value,
        email: currentForm['email'].value,
        date: currentForm['date'].value,
    };
    return (0, validation_1.dataChecker)(data);
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
    (0, services_1.removeUserFromDB)(id)
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
        (0, services_1.editUserFromDB)(editData);
    });
}
