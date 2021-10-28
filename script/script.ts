export interface IUser {
    name: string
    firstName: string
    email: string
    date: string
    id?: number
}
import { dataChecker, controlDate } from "../validation/validation.js";
import { getUsers, removeUserFromDB, editUserFromDB, addUser } from "../httpRequests/services.js";
const modal: HTMLDivElement = <HTMLDivElement>document.querySelector('.modal__container');
const modalAdd: HTMLDivElement = document.querySelector('.add') as HTMLDivElement;
const modalEdit: HTMLDivElement = document.querySelector('#edit') as HTMLDivElement;
const userForm: HTMLFormElement = document.getElementById('add-user-form') as HTMLFormElement;

start();

function start() {
    const addUsersElement: HTMLDivElement = document.querySelector('.add-users') as HTMLDivElement;
    const addModalCancel: HTMLDivElement = document.querySelector('#add-modal-cancel') as HTMLDivElement;

    getUsers()
        .then(users => {
            users.forEach((user: IUser) => {
                createUserCard(user);
            });
        })
        .catch(() => {
            document.body.innerHTML = `<h1 style='color: red'>Somethins is wrong !!!</h1>`;
        });
    controlDate(userForm['date']);
    addUsersElement.addEventListener("click", () => openModal('add'));
    addModalCancel.addEventListener("click", () => cancelModal());
    modalAdd.addEventListener("click", () => addUser(<IUser>getDataFromForm('add')));
}
function openModal(type: string) {
    let header;
    let button;
    if (type === 'add') {
        header = document.querySelector(".add-modal-header");
        button = modalAdd;
        userForm.reset();
    }
    else if (type === 'edit') {
        header = document.querySelector(".edit-modal-header");
        button = modalEdit;
    }
    button.classList.remove("show-necessary-ellement");
    header.classList.remove("show-necessary-ellement");
    modal.classList.add("show");
}
function cancelModal() {
    modal.classList.remove("show");
    userForm.reset();
}
function getDataFromForm(type: string) {
    return dataChecker({
        name: userForm["userName"].value,
        firstName: userForm['firstname'].value,
        email: userForm['email'].value,
        date: userForm['date'].value,
    })
}
function createUserCard(data: IUser) {
    const users: HTMLDivElement = document.querySelector(".users") as HTMLDivElement;
    const user = document.createElement("div");
    const userdata = document.createElement("div");
    const cardButtons = document.createElement("div");
    const edit = document.createElement("button");
    const remove = document.createElement("button");
    const age = document.createElement("h2");
    const name = document.createElement("span");
    const firstName = document.createElement("span");
    const email = document.createElement("p");

    user.classList.add("user-card");
    user.id = "user-card-" + data.id;
    userdata.classList.add("user-data");
    cardButtons.classList.add("card-buttons");
    edit.classList.add("edit");
    remove.classList.add("remove");
    const dateNow = (new Date).getFullYear();
    let year = parseFloat(data.date)
    let userAge = dateNow - year;

    age.innerText = userAge.toString();
    name.innerText = data.name;
    firstName.innerText = data.firstName;
    email.innerText = data.email;
    remove.innerText += 'Delete';
    edit.innerText += 'Edit';

    cardButtons.appendChild(remove);
    cardButtons.appendChild(edit);
    userdata.appendChild(age);
    userdata.appendChild(name);
    userdata.appendChild(firstName);
    userdata.appendChild(email);
    user.appendChild(userdata);
    user.appendChild(cardButtons);
    users.appendChild(user);
    userForm.reset();
    remove.addEventListener('click', () => deleteUserCard(user, <number>data.id));
    edit.addEventListener('click', () => editUserCard(<IUser>data));
}

function deleteUserCard(user: HTMLDivElement, id: number) {
    removeUserFromDB(id)
        .then(() => {
            user.remove();
        })
}
function editUserCard(data: IUser) {
    openModal('edit');
    userForm['userName'].value = data.name;
    userForm['firstname'].value = data.firstName;
    userForm['email'].value = data.email;
    userForm['date'].value = data.date;
    let id = data.id
    modalEdit.addEventListener('click', () => {
        let editData = {
            id,
            ...getDataFromForm('edit'),
        }
        console.log(editData);
        
        editUserFromDB(<IUser>editData);
    });
}