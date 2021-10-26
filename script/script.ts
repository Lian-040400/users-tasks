type DivElement = HTMLDivElement | null;
const addUsersElement = document.querySelector('.add-users');
const addModal: DivElement = document.querySelector('#add-modal');
const editModal: DivElement = document.querySelector('#edit-modal');
const addModalCancel: DivElement = document.querySelector('#add-modal-cancel');
const addModalAdd: DivElement = document.querySelector('#add-modal-add');
const editModalCancel: DivElement = document.querySelector('#edit-modal-cancel');
const editModalAdd: DivElement = document.querySelector('#edit-modal-edit');
const addModalDate: HTMLElement | null = document.getElementById("add-date-input");
const addModalEmail: HTMLElement | null = document.getElementById("add-email-input");
const addModalName: HTMLElement | null = document.getElementById("add-name-input");
const addModalFirstName: HTMLElement | null = document.getElementById("add-firstName-input");


const editModalName: HTMLElement | null = document.getElementById("edit-name-input");
const editModalFirstName: HTMLElement | null = document.getElementById("edit-firstName-input");
const editModalDate: HTMLElement | null = document.getElementById("edit-date-input");
const editModalEmail: HTMLElement | null = document.getElementById("edit-email-input");

controlDate();
addUsersElement?.addEventListener("click", () => openModal('add'));
addModalCancel?.addEventListener("click", () => cancelModal('add'));
addModalAdd?.addEventListener("click", addUser);
editModalCancel?.addEventListener("click", () => cancelModal('edit'));

function getDataFromDb() {
    fetch('http://localhost:9000/users')
        .then(response => response.json())
        .then(users => {
            users.forEach((user: Object) => {
                creatUserCard(user);
            });
        })
        .catch((error) => {
            document.body.innerHTML = `<h1 style='color: red'>Somethins is wrong !!!</h1>`
        })
}
getDataFromDb();

function addUser() {
    if (!getDataFromForm('add')) {
        return
    }


    const data = getDataFromForm('add');

    fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {

        })
        .catch((error) => {
            console.error('Error:', error);
        })
}
function controlDate() {
    const today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    addModalDate?.setAttribute("min", `1890-01-01`);
    addModalDate?.setAttribute("max", `${date}`);
}
function getDataFromForm(type: String) {
    let name: String;
    let firstName: String;
    let email: String;
    let date: String;
    if (type === "add") {
        name = (<HTMLInputElement>addModalName).value;
        firstName = (<HTMLInputElement>addModalFirstName).value;
        email = (<HTMLInputElement>addModalEmail).value;
        date = (<HTMLInputElement>addModalDate).value;
        return checker(name, firstName, email, date);
    }
    else if (type === "edit") {
        name = (<HTMLInputElement>editModalName).value;
        firstName = (<HTMLInputElement>editModalFirstName).value;
        email = (<HTMLInputElement>editModalEmail).value;
        date = (<HTMLInputElement>editModalDate).value;
        console.log('555', checker(name, firstName, email, date));

        return checker(name, firstName, email, date);
    }
}
function checker(name: String, firstName: String, email: String, date: String) {
    if ((name !== "") && (firstName !== "") && (email !== "") && (date !== "")) {
        if (validateEmail(email)) {
            let data = {
                name,
                firstName,
                email,
                date
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
function openModal(type: String) {
    if (type === 'add') {
        addModal?.classList.add("show");
    }
    else {
        editModal?.classList.add("show");
    }

}
function cancelModal(type: string) {
    if (type === "add") {
        addModal?.classList.remove("show");
    }
    else {
        editModal?.classList.remove("show");
    }

}
function validateEmail(email: String): Boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function removeUserFromDB(userId: String) {
    return fetch(`http://localhost:9000/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
    })

}
function editUserFromDB(data: any) {


    return fetch(`http://localhost:9000/users/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                ...data
            }
        )
    })
}
function creatUserCard(data: any) {
    const users = document.querySelector(".users");
    const user = document.createElement("div");
    const userdata = document.createElement("div");
    const cardButtons = document.createElement("div");
    const edit = document.createElement("div");
    const remove = document.createElement("div");
    const age = document.createElement("p");
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
    users?.appendChild(user);

    remove.addEventListener('click', () => {
        removeUserFromDB(data.id)
            .then(() => {
                user.remove();
            })
            .then(res => console.log(res));
    });
    edit.addEventListener('click', () => {
        openModal('edit');
        (<HTMLInputElement>editModalName).value = data.name;
        (<HTMLInputElement>editModalFirstName).value = data.firstName;
        (<HTMLInputElement>editModalEmail).value = data.email;
        (<HTMLInputElement>editModalDate).value = data.date;
        let id = data.id
        editModalAdd?.addEventListener('click', () => {

            let editData = {
                id,
                ...getDataFromForm('edit'),
            }
            editUserFromDB(editData);

        });
    });



}

function clearFormInformation() {
    (<HTMLInputElement>addModalName).value = '';
    (<HTMLInputElement>addModalEmail).value = '';
    (<HTMLInputElement>addModalFirstName).value = '';
    (<HTMLInputElement>addModalDate).value = ''
}

