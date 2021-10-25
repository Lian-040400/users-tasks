type DivElement = HTMLDivElement | null;
const addUsersElement = document.querySelector('.add-users');
const modal: DivElement = document.querySelector('.modal__container');
const cancel: DivElement = document.querySelector('.cancel');
const add: DivElement = document.querySelector('.add');
const dateEllement: HTMLElement | null = document.getElementById("date-input");
const emailEllement: HTMLElement | null = document.getElementById("email-input");
const nameEllement: HTMLElement | null = document.getElementById("name-input");
const firstNameEllement: HTMLElement | null = document.getElementById("first-name-input");
// const users = [];
controlDate();
addUsersElement?.addEventListener("click", openModal);
cancel?.addEventListener("click", cancelModal);
add?.addEventListener("click", addUser);

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
    const data = getDataFromForm();

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
    dateEllement?.setAttribute("min", `1890-01-01`);
    dateEllement?.setAttribute("max", `${date}`);
}
function getDataFromForm() {
    let name = (<HTMLInputElement>nameEllement).value;
    let firstName = (<HTMLInputElement>firstNameEllement).value;
    let email = (<HTMLInputElement>emailEllement).value;
    let date = parseFloat((<HTMLInputElement>dateEllement).value);
    if ((name !== "") || (firstName !== "") || (email !== "") || (date !== NaN)) {
        if (validateEmail(email)) {
            const dateNow = (new Date).getFullYear();
            date = dateNow - date;
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

function openModal() {
    modal?.classList.add("show");
}
function cancelModal() {
    modal?.classList.remove("show");
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
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify(
            {
                "likes": 5
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
    users?.appendChild(user);

    remove.addEventListener('click', () => {
        removeUserFromDB(data.id)
            .then(() => {
                user.remove();
            })
            .then(res => console.log(res));
    });
    edit.addEventListener('click', () => {
        openModal();
        console.log();
        
        (<HTMLInputElement>nameEllement).value = data.name;
        (<HTMLInputElement>firstNameEllement).value = data.firstName;
        (<HTMLInputElement>emailEllement).value = data.email;
        (<HTMLInputElement>dateEllement).value = data.date;

        // (<HTMLInputElement>nameEllement).innerText = "ggggg";
        // editUserFromDB(data);
        // .then(() => {
        //     user.remove();
        // })
        // .then(res => console.log(res));
    });



}

function clearFormInformation() {
    (<HTMLInputElement>nameEllement).value = '';
    (<HTMLInputElement>emailEllement).value = '';
    (<HTMLInputElement>firstNameEllement).value = '';
    (<HTMLInputElement>dateEllement).value = ''
}

