export const fetchingUsers = () => {
    var nombreServidor = $("#central input").val();
    $("#central button").click(()=>{
        let template = '';
        let url = "consultaUsuarios.php"+"?servidor="+nombreServidor;
        fetch(url, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => {
                response.forEach(user => {
                    template += `<ies-usuario foto='${user.foto}' nombre='${user.nombre}'></ies-usuario>`;
                });
                $("#usuarios").html(template);
            })
    });
}