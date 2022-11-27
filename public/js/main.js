class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="header">
        <div class="container">
            <div class="marca">
                <img class="logo" src="assets/logo-img.png" alt="">
                <span class="logo-titulo">SafeCommerce</span>
            </div>
            <div class="navBar">
                <a id="nav_home" href="index.html" class="item-navBar">Home</a>
                <a id="nav_servicos" href="servicos.html" class="item-navBar">Serviços</a>
                <!--<a id="nav_sobrenos" href="sobreNos.html" class="item-navBar">Sobre Nós</a>-->
                <a id="nav_download" href="download.html" class="item-navBar">Download</a>
            </div>
            <div class="registro">
                <a href="login.html"><button class="but-login">Login</button></a>
                <a href="cadastro.html"><button class="but-cadastro">Cadastro</button></a>
            </div>
        </div>
    </div> 
        `
    }
}

customElements.define('my-header', myHeader);

class myFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="footer">
        <div class="container">
            <div class="navBar">
                <a href="" class="item-navBar">Termos de Uso</a>
                <a href="" class="item-navBar">Privacidade</a>
                <a href="" class="item-navBar">Cookies</a>
                <a href="" class="item-navBar">Política da Empresa</a>
                <a href="" class="item-navBar">Contato</a>
            </div>
            <div class="marca">
                <img class="logo" src="assets/logo-img.png" alt="">
                <span class="logo-titulo">SafeCommerce</span>
                <span class="logo-trademark">© 2022 SafeCommerce Inc. Todos os direitos reservados.</span>
            </div>
        </div>
    </div> 
        `
    }
}

customElements.define('my-footer', myFooter);