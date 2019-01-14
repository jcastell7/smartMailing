import * as contacts from "../models/contacts";
import * as lists from "../services/loadData";
var txtId = document.getElementById("id");
var txtName = document.getElementById("name");
var txtEmail = document.getElementById("email");
var btnNew = document.getElementById("btn-new");
var btnSave = document.getElementById("btn-save");
var btnDelete = document.getElementById("btn-delete");
var list = document.getElementById("list");
window.onload = function () {

    function clear() {
        txtId.value = "";
        txtName.value = "";
        txtEmail.value = "";
        btnSave.innerText = "Guardar";
        btnDelete.style.display = "none";
    }
    function save() {
        if (txtName.value.trim() != "" && txtEmail.value.trim() != "") {
            if (btnSave.innerText == "Editar") {
                contacts.updateById(txtId.value, txtName.value, txtEmail.value).then(() => {
                    alert("Editado Exitoso");
                    clear();
                    loadContacts()
                }).catch((error) => {
                    alert("Ha ocurrido un error");
                    console.error(error);
                });
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
    async function loadContacts() {
            list.innerHTML = await lists.listContacts();
    }
    function deleteContact(){
        if(confirm("¿Está Seguro?")){
            contacts.deleteById(txtId.value).then(()=>{
                clear();    
                loadContacts();
            })
        }
    }
    loadContacts()
    btnNew.addEventListener("click", clear);
    btnSave.addEventListener("click", save);
    btnDelete.addEventListener("click", deleteContact);
}
function selectItem(_id) {
    _id = _id.substr(7, _id.length);
    contacts.findById(_id).then((item) => {
        id.value = item.id;
        txtName.value = item.name;
        txtEmail.value = item.email;
        btnSave.innerText = "Editar";
        btnDelete.style.display = "block";
    })
}