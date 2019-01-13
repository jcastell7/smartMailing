import * as contact from "../models/contacts";
import * as product from "../models/products";
import * as task from "../models/task";



window.onload = function () {
    async function loadLists() {
        let productsHtml = "", tasksHtml ="", contactsHtml ="";
        try{
            var products = await product.getProducts();
            var tasks = await task.getTasks();
            var contacts = await contact.getContacts();
        }catch(error){
            alert("Ha ocurrido un error");
            console.error(error);
        }
        products.forEach(item => {
            productsHtml += `<li class="list-group-item" onclick="selectItem(product${item.task_product_id})">${item.name}</li>`;
        });
        tasks.forEach(item => {
            tasksHtml += `<li class="list-group-item" onclick="selectItem(task${item.task_id})">${item.name}</li>`;
        });
        contacts.forEach(item => {
            contactsHtml += `<li class="list-group-item" onclick="selectItem(contact${item.task_contact_id})">${item.name}</li>`;
        });

        document.getElementById("productList").innerHTML = productsHtml
        document.getElementById("taskList").innerHTML = tasksHtml;
        document.getElementById("contactList").innerHTML = contactsHtml;
        console.log(products);
    }

    loadLists();
}
