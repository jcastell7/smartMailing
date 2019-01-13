import { create } from "../models/contacts";
window.onload = function () {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let newBtn = document.getElementById("btn-new");
    let saveBtn = document.getElementById("btn-save");
    function clear() {
        name.value = ""
        email.value = ""
    }
    function save() {
        if(name.value.trim() != "" && email.value.trim() != ""){
            create(name.value, email.value).then(()=>{
                alert("Guardado Exitoso");
                clear();
            }).catch((error)=>{
                alert("Ha ocurrido un error");
                console.error(error);
            });
        }
    }
    newBtn.addEventListener("click", clear);
    saveBtn.addEventListener("click", save);
}
