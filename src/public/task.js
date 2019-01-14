import * as tasks from "../models/task";
import * as lists from "../services/loadData";
var txtId = document.getElementById("id");
var txtDate = document.getElementById("date");
var txtName = document.getElementById("name");
var txtDays = document.getElementById("days");
var txtSubject = document.getElementById("subject");
var txtMessage = document.getElementById("message");
var btnNew = document.getElementById("btn-new");
var btnSave = document.getElementById("btn-save");
var btnDelete = document.getElementById("btn-delete");
var contactList = document.getElementById("contactCheckList");
var productList = document.getElementById("productCheckList");
var taskList = document.getElementById("taskList");

window.onload = function() {
  function clear() {
    txtId.value = "";
    txtDate.value = "";
    txtName.value = "";
    txtDays.value = "";
    txtSubject.value = "";
    txtMessage.value = "";
    btnSave.innerText = "Guardar";
    btnDelete.style.display = "none";
  }
  function save() {
    if (txtName.value.trim() != "" && txtDays.value.trim() != "") {
      if (btnSave.innerText == "Editar") {
        name, message, cron_day, cron_date, _id;
        tasks.updateById(
            txtName.value,
            txtMessage.value,
            txtDays.value,
            txtSubject.value,
            txtDate.value,
            txtId.value
          )
          .then(() => {
            alert("Editado Exitoso");
            clear();
            loadLists();
          })
          .catch(error => {
            alert("Ha ocurrido un error");
            console.error(error);
          });
      } else {
        let contactList = document.getElementsByName("contacts");
        let productList = document.getElementsByName("products");
        let contacts =[], products = [];
        contactList.forEach(item => {
            item.checked ==true ? contacts.push(item.id.substr(7, item.id.length)) : "";
        });
        productList.forEach(item => {
            item.checked ==true ? products.push(item.id.substr(7, item.id.length)) : "";
        });
        tasks.create(txtName.value, txtSubject.value, txtMessage.value, txtDays.value, contacts, products)
          .then(() => {
            alert("Guardado Exitoso");
            clear();
            loadLists();
          })
          .catch(error => {
            alert("Ha ocurrido un error");
            console.error(error);
          });
      }
    }
  }
  async function loadLists() {
    contactList.innerHTML = await lists.listContactsCheck();
    productList.innerHTML = await lists.listProductsCheck();
    taskList.innerHTML = await lists.listTasks();
  }
  function deleteProduct() {
    if (confirm("¿Está Seguro?")) {
      tasks.deleteById(txtId.value).then(() => {
        clear();
        loadLists();
      });
    }
  }
  loadLists();
  btnNew.addEventListener("click", clear);
  btnSave.addEventListener("click", save);
  btnDelete.addEventListener("click", deleteProduct);
};
function selectItem(_id) {
  _id = _id.substr(4, _id.length);
  tasks.findById(_id).then(item => {
    txtId.value = item.id
    txtDate.value = item.cron_date;
    txtName.value = item.name;
    txtDays.value = item.cron_day;
    txtSubject.value = item.subject;
    txtMessage.value = item.message;
    btnSave.innerText = "Editar";
    btnDelete.style.display = "block";
  });
}
