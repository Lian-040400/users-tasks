export interface IUser {
    name: string
    firstName: string
    email: string
    date: string
    id?: number
}
import { dataChecker, controlDate } from "../validation/validation";
import { getUsers, removeUserFromDB, editUserFromDB, addUser } from "../httpRequests/services";

const addModal: HTMLDivElement = <HTMLDivElement>document.querySelector('#add-modal');
const editModal: HTMLDivElement = document.querySelector('#edit-modal') as HTMLDivElement;
const editModalAdd: HTMLDivElement = document.querySelector('#edit-modal-edit') as HTMLDivElement;
const addUserForm: HTMLFormElement = document.getElementById('add-user-form') as HTMLFormElement;
const editUserForm: HTMLFormElement = document.getElementById('edit-user-form') as HTMLFormElement;

start();

function start() {
    const addUsersElement: HTMLDivElement = document.querySelector('.add-users') as HTMLDivElement;
    const addModalCancel: HTMLDivElement = document.querySelector('#add-modal-cancel') as HTMLDivElement;
    const addModalAdd: HTMLDivElement = document.querySelector('#add-modal-add') as HTMLDivElement;
    const editModalCancel: HTMLDivElement = document.querySelector('#edit-modal-cancel') as HTMLDivElement;

    getUsers()
        .then(users => {
            users.forEach((user: IUser) => {
                createUserCard(user);
            });
        })
        .catch(() => {
            document.body.innerHTML = `<h1 style='color: red'>Somethins is wrong !!!</h1>`;
        });

    controlDate(addUserForm['date']);

    addUsersElement.addEventListener("click", () => openModal('add'));
    addModalCancel.addEventListener("click", () => cancelModal('add'));
    addModalAdd.addEventListener("click", () => addUser(<IUser>getDataFromForm('add')));
    editModalCancel.addEventListener("click", () => cancelModal('edit'));
}
function openModal(type: string) {
    const modal = type === 'add' ? addModal : editModal;
    modal.classList.add("show");
}
function cancelModal(type: string) {
    const modal = type === 'add' ? addModal : editModal;
    modal.classList.remove("show");
    addUserForm.reset();
}

function getDataFromForm(type: string) {
    let data: IUser;
    let currentForm: HTMLFormElement = type === "add" ? addUserForm : editUserForm as HTMLFormElement;
    data = {       
        name:currentForm["userName"].value,
        firstName: currentForm['firstname'].value,
        email: currentForm['email'].value,
        date: currentForm['date'].value,
    }
    return dataChecker(data)
}


function createUserCard(data: IUser) {

    const users: HTMLDivElement = document.querySelector(".users") as HTMLDivElement;
    const user = document.createElement("div");
    const userdata = document.createElement("div");
    const cardButtons = document.createElement("div");
    const edit = document.createElement("button");
    const remove = document.createElement("button");
    debugger

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
    
    editUserForm['userName'].value = data.name;
    editUserForm['firstname'].value = data.firstName;
    editUserForm['email'].value = data.email;
    editUserForm['date'].value = data.date;
    let id = data.id
    editModalAdd.addEventListener('click', () => {
        let editData = {
            id,
            ...getDataFromForm('edit'),
        }
        editUserFromDB(<IUser>editData);
    });
}