class infoUser extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const fotoUser = this.getAttribute('foto');
        const nomUser = this.getAttribute('nombre');
        this.innerHTML = `<div style="margin:0 0 25px 0">
            <img id="imgUser" class="img-users" width="120" src="imagenes/${fotoUser}">
            <div id="nomUser" style="margin:12px 0 0 0">${nomUser}</div>
        <div>`;
    }
}

window.customElements.define('ies-usuario', infoUser);