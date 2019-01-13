import * as contacts from "../models/contacts";
var txtId = document.getElementById("id")
var txtName = document.getElementById("name");
var txtEmail = document.getElementById("email");
var newBtn = document.getElementById("btn-new");
var saveBtn = document.getElementById("btn-save");
var btnDelete = document.getElementById("btn-delete");
var list = document.getElementById("list");
window.onload = function () {

    function clear() {
        txtId.value = "";
        txtName.value = "";
        txtEmail.value = "";
        saveBtn.innerText = "Guardar";
        btnDelete.style.display = "none";
    }
    function save() {
        if (txtName.value.trim() != "" && txtEmail.value.trim() != "") {
            if (saveBtn.innerText == "Editar") {

            } else {
                contacts.create(txtName.value, txtEmail.value).then(() => {
                    alert("Guardado Exitoso");
                    clear();
                    loadContacts()
                }).catch((error) => {
                    alert("Ha ocurrido un error");
                    console.error(error);
                });
            }
        }
    }
    function loadContacts() {
        contacts.getContacts().then((data) => {
            console.log(data)
            list.innerHTML = '';
            for (let item in data) {
                console.log(item)
                list.innerHTML += `<li class="list-group-item" onclick="selectItem(${data[item].task_contact_id})">${data[item].name}</li>`;
            }
        }).catch((error) => {
            alert("Ha ocurrido un error");
            console.error(error);
        });
    }
    function deleteContact(){
        if(confirm("¿ Estas Seguro ?")){
            contacts.deleteById(txtId.value).then(()=>{
                clear();    
                loadContacts();
            })
        }
    }
    loadContacts()
    newBtn.addEventListener("click", clear);
    saveBtn.addEventListener("click", save);
    btnDelete.addEventListener("click", deleteContact);
}
function selectItem(_id) {
    contacts.findById(_id).then((item) => {
        id.value = item.task_contact_id;
        txtName.value = item.name;
        txtEmail.value = item.email;
        saveBtn.innerText = "Editar";
        btnDelete.style.display = "block";
    })
}