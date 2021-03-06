import { IUser } from "../script/script.js";
export function dataChecker(data: IUser) {
    if ((data.name !== "") && (data.firstName !== "") && (data.email !== "") && (data.date !== "")) {
        if (validateEmail(data.email)) {
            return data;
        }
        else {
            alert("Must be email!!!!");
        }
    }
    else {
        alert("All field are requaired!!!!");  
    }
}
export function controlDate(formDate) {
    const today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    formDate.setAttribute("min", `1890-01-01`);
    formDate.setAttribute("max", `${date}`);
}
function validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}