"use strict";
var addUsersElement = document.querySelector('.add-users');
var modal = document.querySelector('.modal__container');
var cancel = document.querySelector('.cancel');
var add = document.querySelector('.add');
var dateEllement = document.getElementById("date-input");
var emailEllement = document.getElementById("email-input");
var nameEllement = document.getElementById("name-input");
var firstNameEllement = document.getElementById("first-name-input");
controlDate();
addUsersElement === null || addUsersElement === void 0 ? void 0 : addUsersElement.addEventListener("click", openModal);
cancel === null || cancel === void 0 ? void 0 : cancel.addEventListener("click", cancelModal);
add === null || add === void 0 ? void 0 : add.addEventListener("click", addUser);
function addUser() {
    var data = getDataFromForm();
    creatUserCard(data);
    cancelModal();
    clearFormInformation();
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
            return {
                name: name,
                firstName: firstName,
                email: email,
                date: date
            };
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
    // remove.addEventListener("click", cancelModal);
    // edit.addEventListener("click", ()=>{
    //     age.innerText = data.date;
    // name.innerText = data.name;
    // firstName.innerText = data.firstName;
    // email.innerText = data.email;
    // });
}
function clearFormInformation() {
    nameEllement.value = '';
    emailEllement.value = '';
    firstNameEllement.value = '';
    dateEllement.value = '';
}
