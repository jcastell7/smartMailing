import * as contact from "../models/contacts";
import * as product from "../models/products";
import * as task from "../models/task";

export const loadLists = async () => {
    let productsHtml = await listProducts();
    let tasksHtml = await listTasks();
    let contactsHtml = await listContacts();
    document.getElementById("productList").innerHTML = productsHtml
    document.getElementById("taskList").innerHTML = tasksHtml;
    document.getElementById("contactList").innerHTML = contactsHtml;
}

export const listProducts = async () =>{
    let productsHtml = "";
    let products = await product.getProducts().catch(error=>{
        alert("Ha ocurrido un error");
        console.error(error);
    });
    products.forEach(item => {
        productsHtml += `<li class="list-group-item" onclick="selectItem('product${item.task_product_id}')">${item.name}</li>`;
    });
    return productsHtml;
}

export const listTasks = async () =>{
    let tasksHtml = "";
    let tasks = await task.getTasks().catch(error=>{
        alert("Ha ocurrido un error");
        console.error(error);
    });
    tasks.forEach(item => {
        tasksHtml += `<li class="list-group-item" onclick="selectItem('task${item.task_id}')">${item.name}</li>`;
    });
    return tasksHtml;
}

export const listContacts = async () =>{
    let contactsHtml = "";
    let contacts = await contact.getContacts().catch(error=>{
        alert("Ha ocurrido un error");
        console.error(error);
    });
    contacts.forEach(item => {
        contactsHtml += `<li class="list-group-item" onclick="selectItem('contact${item.task_contact_id}')">${item.name}</li>`;
    });
    return contactsHtml;
}

export const listContactsCheck = async () => {
    let contactsHtml = "";
    let contacts = await contact.getContacts().catch(error=>{
        alert("Ha ocurrido un error");
        console.error(error);
    });
    contacts.forEach(item => {
        contactsHtml +=`<li>
        <div class="checkbox">
          <div class="check">
            <input type="checkbox" name="contacts" id="contact${item.task_contact_id}" />
            <div class="check-container">
              <div class="check-off"></div>
              <div class="check-on"><i></i></div>
            </div>
          </div>
          <div class="label">
            <mark>${item.name}</mark> <br />
            <p>${item.email}</p>
          </div>
        </div>
      </li>`;
    });
    return contactsHtml;
}

export const listProductsCheck = async () => {
    let contactsHtml = "";
    let contacts = await product.getProducts().catch(error=>{
        alert("Ha ocurrido un error");
        console.error(error);
    });
    contacts.forEach(item => {
        contactsHtml +=`<li>
        <div class="checkbox">
          <div class="check">
            <input type="checkbox" name="contacts" id="contact${item.task_product_id}" />
            <div class="check-container">
              <div class="check-off"></div>
              <div class="check-on"><i></i></div>
            </div>
          </div>
          <div class="label">
            <mark>${item.name}</mark> <br />
            <p>Cantidad: ${item.quantity}</p>
          </div>
        </div>
      </li>`;
    });
    return contactsHtml;
}