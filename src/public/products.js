import * as products from "../models/products";
import * as lists from "../services/loadData";
var txtId = document.getElementById("id")
var txtName = document.getElementById("name");
var txtQuanity = document.getElementById("quanity");
var btnNew = document.getElementById("btn-new");
var btnSave = document.getElementById("btn-save");
var btnDelete = document.getElementById("btn-delete");
var list = document.getElementById("list");
window.onload = function () {

    function clear() {
        txtId.value = "";
        txtName.value = "";
        txtQuanity.value = "";
        btnSave.innerText = "Guardar";
        btnDelete.style.display = "none";
    }
    function save() {
        if (txtName.value.trim() != "" && txtQuanity.value.trim() != "") {
            if (btnSave.innerText == "Editar") {
                products.updateById(txtId.value, txtName.value, txtQuanity.value).then(() => {
                    alert("Editado Exitoso");
                    clear();
                    loadProducts()
                }).catch((error) => {
                    alert("Ha ocurrido un error");
                    console.error(error);
                });
            } else {
                products.create(txtName.value, txtQuanity.value).then(() => {
                    alert("Guardado Exitoso");
                    clear();
                    loadProducts()
                }).catch((error) => {
                    alert("Ha ocurrido un error");
                    console.error(error);
                });
            }
        }
    }
    async function loadProducts() {
            list.innerHTML = await lists.listProducts();
    }
    function deleteContact(){
        if(confirm("¿Está Seguro?")){
            products.deleteById(txtId.value).then(()=>{
                clear();    
                loadProducts();
            })
        }
    }
    loadProducts()
    btnNew.addEventListener("click", clear);
    btnSave.addEventListener("click", save);
    btnDelete.addEventListener("click", deleteContact);
}
function selectItem(_id) {
    _id = _id.substr(7, _id.length);
    products.findById(_id).then((item) => {
        id.value = item.task_product_id;
        txtName.value = item.name;
        txtQuanity.value = item.quantity;
        btnSave.innerText = "Editar";
        btnDelete.style.display = "block";
    })
}