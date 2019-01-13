import * as contact from "../models/contacts";
import * as product from "../models/products";
import * as task from "../models/taskbnb  ";

async function loadLists() {
    let productsHtml, tasksHtml, contactsHtml;
    try{
        var products = await product.getProducts();
        var tasks = await task.getTasks();
        var contacts = await contact.getContacts();
    }catch(error){
        alert("Ha ocurrido un error");
        console.error(error);
    }
    products.forEach(item => {
        productsHtml += `<li class="list-group-item" onclick="selectItem(product${item.task_contact_id})">${item.name}</li>`;
    });
    tasks.forEach(item => {
        tasksHtml += `<li class="list-group-item" onclick="selectItem(task${item.task_contact_id})">${item.name}</li>`;
    });
    contacts.forEach(item => {
        contactsHtml += `<li class="list-group-item" onclick="selectItem(contact${item.task_contact_id})">${item.name}</li>`;
    });
    $("#productList").html(productsHtml);
    $("#taskList").html(tasksHtml);
    $("#contactList").html(contactsHtml);
}

window.onload = function () {
    loadLists();
}
