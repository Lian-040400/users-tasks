"use strict";
var addUsersElement = document.querySelector('.users');
var modal = document.querySelector('.modal__container');
var cancel = document.querySelector('.cancel');
var add = document.querySelector('.add');
console.log(modal);
addUsersElement === null || addUsersElement === void 0 ? void 0 : addUsersElement.addEventListener("click", openModal);
cancel === null || cancel === void 0 ? void 0 : cancel.addEventListener("click", cancelModal);
add === null || add === void 0 ? void 0 : add.addEventListener("click", addUser);
function addUser() {
}
console.log(getDataFromForm());
function getDataFromForm() {
    var name = document.getElementById("name-input").value;
    var firstName = document.getElementById("first-name-input").value;
    var email = document.getElementById("email-input").value;
    var date = parseFloat(document.getElementById("date-input").value);
    if ((name === "") || (firstName === "") || (email === "") || (date === NaN)) {
    }
    return {
        name: name,
        firstName: firstName,
        email: email,
        date: date
    };
}
function openModal() {
    modal === null || modal === void 0 ? void 0 : modal.classList.add("show");
}
function cancelModal() {
    modal === null || modal === void 0 ? void 0 : modal.classList.remove("show");
}
