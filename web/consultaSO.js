onload = () => {
    esAdmin();
}

function esAdmin() {
    const login = JSON.parse(localStorage.getItem("datosLogin"));
    if (login.perfil == 'admin') {
        $("#btn-consultar").removeAttr("disabled");
        realizarConsulta();
    }
}

function realizarConsulta() {
    $("#btn-consultar").click(()=> {
        const consultaOpt = $("#central select").val();
        const fecha = $("#central input").val()
        const patronFecha = /^[0-9]{2}[-][0-9]{2}[-][0-9]{4}$/;
        if (consultaOpt == "Escoge una consulta" || patronFecha.test(fecha) == false) {
            alert("Opcion o fecha no valida");
        } else {
            //seleccionamos la tabla donde mostrar la respuesta del servidor
            const tabla = $("#central table");
            //si ya hay elementos pintados en la tabla la vaciamos para no concatenar
            if (document.getElementsByTagName("tbody")) {
                tabla.html("");
            }
            tabla.append("<tbody></tbody>");

            //realizamos peticion al servidor
            const proceso = consultaOpt;
            const _fecha = fecha;
            const usuario = "chapuza";
            const url = `consultaSO.php?usuario=${usuario}&consulta=${proceso}&fecha=${_fecha}`;
            $.get(url,{},(response) => {
                console.log(response);
                //pinto las cabeceras
                let cabeceras = response.split(";")[0].split(":");
                $("table").append("<thead></thead>");
                cabeceras.forEach(cabecera => {
                    $("thead").append(`<th>${cabecera}</th>`);
                });
                //separo los datos a pintar en cada celda de la tabla
                let filas = response.split(";");
                //pinto los filas
                for (let i = 1; i < filas.length-1; i++) {
                    let datosCelda = filas[i].split(":");
                    let tr = document.createElement("tr");
                    $("tbody").append(tr);
                    datosCelda.forEach((dato) => {
                        let td = document.createElement("td");
                        td.textContent = dato;
                        tr.appendChild(td);
                        console.log(td);
                    });
                }
            });
        }
    });
}