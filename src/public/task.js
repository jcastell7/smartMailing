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
    txt.date = "";
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
        tasks
          .updateById(
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
        tasks
          .create(txtName.value, txtDays.value)
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
    id.value = item.id;
    txtName.value = item.name;
    txtDays.value = item.quantity;
    txtId = document.getElementById("id");
    txtDate = document.getElementById("date");
    txtName = document.getElementById("name");
    txtDays = document.getElementById("days");
    txtSubject = document.getElementById("subject");
    txtMessage = document.getElementById("message");
    btnSave.innerText = "Editar";
    btnDelete.style.display = "block";
  });
}
