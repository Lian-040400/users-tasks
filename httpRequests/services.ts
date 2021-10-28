import { IUser } from "../script/script.js";
export { getUsers, removeUserFromDB, editUserFromDB };

function getUsers() {
    return fetch('http://localhost:9000/users')
        .then(response => response.json());
}
function removeUserFromDB(userId: number) {
    return fetch(`http://localhost:9000/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
}
function editUserFromDB(data: IUser) {
    return fetch(`http://localhost:9000/users/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data })
    })
}
export function addUser(data:IUser) {
    if (!data) {
        return
    }
    fetch('http://localhost:9000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .catch(() => {
            document.body.innerHTML = `<h1 style='color: red'>Somethins is wrong !!!</h1>`;
        })
}
