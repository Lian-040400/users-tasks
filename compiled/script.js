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
var addUsersElement = document.querySelector('.add-users');
var addModal = document.querySelector('#add-modal');
var editModal = document.querySelector('#edit-modal');
var addModalCancel = document.querySelector('#add-modal-cancel');
var addModalAdd = document.querySelector('#add-modal-add');
var editModalCancel = document.querySelector('#edit-modal-cancel');
var editModalAdd = document.querySelector('#edit-modal-edit');
var addModalDate = document.getElementById("add-date-input");
var addModalEmail = document.getElementById("add-email-input");
var addModalName = document.getElementById("add-name-input");
var addModalFirstName = document.getElementById("add-firstName-input");
var editModalName = document.getElementById("edit-name-input");
var editModalFirstName = document.getElementById("edit-firstName-input");
var editModalDate = document.getElementById("edit-date-input");
var editModalEmail = document.getElementById("edit-email-input");
controlDate();
addUsersElement === null || addUsersElement === void 0 ? void 0 : addUsersElement.addEventListener("click", function () { return openModal('add'); });
addModalCancel === null || addModalCancel === void 0 ? void 0 : addModalCancel.addEventListener("click", function () { return cancelModal('add'); });
addModalAdd === null || addModalAdd === void 0 ? void 0 : addModalAdd.addEventListener("click", addUser);
editModalCancel === null || editModalCancel === void 0 ? void 0 : editModalCancel.addEventListener("click", function () { return cancelModal('edit'); });
function getDataFromDb() {
    fetch('http://localhost:9000/users')
        .then(function (response) { return response.json(); })
        .then(function (users) {
        users.forEach(function (user) {
            creatUserCard(user);
        });
    })
        .catch(function (error) {
        document.body.innerHTML = "<h1 style='color: red'>Somethins is wrong !!!</h1>";
    });
}
getDataFromDb();
function addUser() {
    if (!getDataFromForm('add')) {
        return;
    }
    var data = getDataFromForm('add');
    fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
    })
        .catch(function (error) {
        console.error('Error:', error);
    });
}
function controlDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    addModalDate === null || addModalDate === void 0 ? void 0 : addModalDate.setAttribute("min", "1890-01-01");
    addModalDate === null || addModalDate === void 0 ? void 0 : addModalDate.setAttribute("max", "" + date);
}
function getDataFromForm(type) {
    var name;
    var firstName;
    var email;
    var date;
    if (type === "add") {
        name = addModalName.value;
        firstName = addModalFirstName.value;
        email = addModalEmail.value;
        date = addModalDate.value;
        return checker(name, firstName, email, date);
    }
    else if (type === "edit") {
        name = editModalName.value;
        firstName = editModalFirstName.value;
        email = editModalEmail.value;
        date = editModalDate.value;
        console.log('555', checker(name, firstName, email, date));
        return checker(name, firstName, email, date);
    }
}
function checker(name, firstName, email, date) {
    if ((name !== "") && (firstName !== "") && (email !== "") && (date !== "")) {
        if (validateEmail(email)) {
            var data = {
                name: name,
                firstName: firstName,
                email: email,
                date: date
            };
            return data;
        }
        else {
            alert("mast be email");
        }
    }
    else {
        alert("All field are requared");
    }
}
function openModal(type) {
    if (type === 'add') {
        addModal === null || addModal === void 0 ? void 0 : addModal.classList.add("show");
    }
    else {
        editModal === null || editModal === void 0 ? void 0 : editModal.classList.add("show");
    }
}
function cancelModal(type) {
    if (type === "add") {
        addModal === null || addModal === void 0 ? void 0 : addModal.classList.remove("show");
    }
    else {
        editModal === null || editModal === void 0 ? void 0 : editModal.classList.remove("show");
    }
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
function creatUserCard(data) {
    var users = document.querySelector(".users");
    var user = document.createElement("div");
    var userdata = document.createElement("div");
    var cardButtons = document.createElement("div");
    var edit = document.createElement("div");
    var remove = document.createElement("div");
    var age = document.createElement("p");
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
    users === null || users === void 0 ? void 0 : users.appendChild(user);
    remove.addEventListener('click', function () {
        removeUserFromDB(data.id)
            .then(function () {
            user.remove();
        })
            .then(function (res) { return console.log(res); });
    });
    edit.addEventListener('click', function () {
        openModal('edit');
        editModalName.value = data.name;
        editModalFirstName.value = data.firstName;
        editModalEmail.value = data.email;
        editModalDate.value = data.date;
        var id = data.id;
        editModalAdd === null || editModalAdd === void 0 ? void 0 : editModalAdd.addEventListener('click', function () {
            var editData = __assign({ id: id }, getDataFromForm('edit'));
            editUserFromDB(editData);
        });
    });
}
function clearFormInformation() {
    addModalName.value = '';
    addModalEmail.value = '';
    addModalFirstName.value = '';
    addModalDate.value = '';
}
