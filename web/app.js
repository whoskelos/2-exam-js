import { fetchingUsers } from './consultaUsuarios.js';
var intentos = 1;
$.getScript("componenteUsuario.js");
onload = () => {
    fetchingUsers();
    $(document).on("click",".img-users",(e)=> {
        let nombre = e.currentTarget.parentElement.parentElement.getAttribute("nombre");
        $("#login").show();
        $(":text").val(nombre);
        $(":password").removeAttr("disabled");
        $("#login button").click(() => {
            login(nombre,$(":password").val());
        });
    })
}

function login(user,pass) {
    console.log(intentos);
    if (intentos >= 3) {
        $(":text").val("");
    }
    $.post("validar.php", { usuario: user, clave: pass },
        function (response) {
            console.log(response);
            const respuesta = JSON.parse(response);
            if (respuesta.estado == 'OK') {
                localStorage.setItem("datosLogin",response);
            } else {
                intentos++;
                if ($("#txtError")) {
                    $("#txtError").remove();
                }
                $("#login").append(`<p style="color:red" id="txtError">${respuesta.estado}</p>`);
            }
        });
}
