"use strict";
var addUsersElement = document.querySelector('.add-users');
var modal = document.querySelector('.modal__container');
var cancel = document.querySelector('.cancel');
var add = document.querySelector('.add');
var dateEllement = document.getElementById("date-input");
var emailEllement = document.getElementById("email-input");
var nameEllement = document.getElementById("name-input");
var firstNameEllement = document.getElementById("first-name-input");
// const users = [];
controlDate();
addUsersElement === null || addUsersElement === void 0 ? void 0 : addUsersElement.addEventListener("click", openModal);
cancel === null || cancel === void 0 ? void 0 : cancel.addEventListener("click", cancelModal);
add === null || add === void 0 ? void 0 : add.addEventListener("click", addUser);
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
    var data = getDataFromForm();
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
    dateEllement === null || dateEllement === void 0 ? void 0 : dateEllement.setAttribute("min", "1890-01-01");
    dateEllement === null || dateEllement === void 0 ? void 0 : dateEllement.setAttribute("max", "" + date);
}
function getDataFromForm() {
    var name = nameEllement.value;
    var firstName = firstNameEllement.value;
    var email = emailEllement.value;
    var date = parseFloat(dateEllement.value);
    if ((name !== "") || (firstName !== "") || (email !== "") || (date !== NaN)) {
        if (validateEmail(email)) {
            var dateNow = (new Date).getFullYear();
            date = dateNow - date;
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
function openModal() {
    modal === null || modal === void 0 ? void 0 : modal.classList.add("show");
}
function cancelModal() {
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("show");
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
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify({
            "likes": 5
        })
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
    age.innerText = data.date;
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
        openModal();
        nameEllement.value = data.name;
        firstNameEllement.value = data.firstName;
        emailEllement.value = data.email;
        dateEllement.value = data.date;
        // (<HTMLInputElement>nameEllement).innerText = "ggggg";
        // editUserFromDB(data);
        // .then(() => {
        //     user.remove();
        // })
        // .then(res => console.log(res));
    });
}
function clearFormInformation() {
    nameEllement.value = '';
    emailEllement.value = '';
    firstNameEllement.value = '';
    dateEllement.value = '';
}
