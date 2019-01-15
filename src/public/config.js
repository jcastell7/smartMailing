import * as config from "../models/config";
var txtMail = document.getElementById("email");
var txtPass = document.getElementById("password");

    function save() {
        if (txtMail.value.trim() != "" && txtPass.value.trim() != "") {
            config.updateConfig(txtMail.value, txtPass.value).then(() => {
                alert("Configuraciones Almacenadas Correctamente");
            }).catch((error) => {
                alert("Ha ocurrido un error");
                console.error(error);
            });
        }else{
            alert("Por favor rellene todos los campos");
        }
    }

