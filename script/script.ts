
type DivElement = HTMLDivElement | null;

const addUsersElement = document.querySelector('.users');
const modal: DivElement = document.querySelector('.modal__container');
const cancel: DivElement = document.querySelector('.cancel');
const add: DivElement = document.querySelector('.add');
console.log(modal);

addUsersElement?.addEventListener("click", openModal);
cancel?.addEventListener("click", cancelModal);
add?.addEventListener("click", addUser);

function addUser() {




}
console.log(getDataFromForm());

function getDataFromForm() {
    let name = (<HTMLInputElement>document.getElementById("name-input")).value;
    let firstName = (<HTMLInputElement>document.getElementById("first-name-input")).value;
    let email = (<HTMLInputElement>document.getElementById("email-input")).value;
    let date = parseFloat((<HTMLInputElement>document.getElementById("date-input")).value);
    if ((name === "") || (firstName === "") || (email === "")|| (date === NaN)) {

    }
    return {
        name,
        firstName,
        email,
        date
    };
}
function openModal() {
    modal?.classList.add("show");
}
function cancelModal() {
    modal?.classList.remove("show");
}
