var btnRegisterUser = document.getElementById('btn_registerUser')

const paletaCores = [
    'rgb(220, 61, 37)',
    'rgb(236, 148, 132)',
    'rgb(28, 60, 154)',
    'rgb(79, 101, 168)',
    'rgb(132, 37, 20)'
]

//sessão
function validateSession() {
    var companyName = sessionStorage.NOME_EMPRESA;
    var userName = sessionStorage.NOME_USUARIO;
    var fkAdmin = sessionStorage.FK_ADMIN;

    var spanCompany = document.getElementById('company_name');
    var spanName = document.getElementById('user_name');

    if (userName != null) {
        if (spanName != undefined) {
            spanName.innerHTML = userName;
        }
    }
    if (companyName != null) {
        if(spanCompany != undefined) {
            spanCompany.innerHTML = companyName;
        }
    }
    if (fkAdmin == 'null') {
        btnRegisterUser.style.display = 'block';
    } else {
        btnRegisterUser.style.display = 'none';
    }
}

// Abrir e fechar a barra lateral
var bar = document.getElementById("bar");
var sidebar = document.getElementById("sidebar-wrapper");
var page_content = document.getElementById("page-content-wrapper");
var hamburguer_menu = document.getElementById("bar");
var btn_close = document.getElementById("btn-close");
var bodyClientWidth = Number(document.body.clientWidth);

var isMobile = false;
var isSideBarOpen = false;


function responsive(){
    bodyClientWidth = Number(document.body.clientWidth);
    if (bodyClientWidth < 910) {
        isMobile = true;
        
    } else {
        isMobile = false
    } 
}


bar.addEventListener("click", function() {
    if(isSideBarOpen) {
        closeSideBar();
    } else {
        openSideBar();
    }
});

btn_close.addEventListener("click", function() {
    closeSideBar();
})

function openSideBar() {
    console.log("entrou")
    if(isMobile) {
        sidebar.style.display = 'block';
        sidebar.style.width = '0px'
        sidebar.style.width = '270px'
        hamburguer_menu.style.display = 'none';
        btn_close.style.display = 'block';
    } else {
        sidebar.style.display = 'block';
        sidebar.style.width = '0px';
        page_content.style.marginLeft = '270px';
        sidebar.style.width = '270px';    
    }

    isSideBarOpen = true;
}

function closeSideBar() {
    if(isMobile) {
        hamburguer_menu.style.display = 'block';
        btn_close.style.display = 'none';
        sidebar.style.display = 'none';
    } else {
        sidebar.style.width = '0';
        page_content.style.marginLeft = '0'    
    }

    isSideBarOpen = false;
}

// Fim de abrir e fechar barra lateral

// Dropdown

var btnDropdown = document.getElementById("dropdown");
var dropdownContent = document.getElementById("dropdown-content");
var isDropdownActive = false;

btnDropdown.addEventListener("click", function() {
    if(isDropdownActive) {
        closeDropdown();
    } else {
        openDropdown();
    }
});

function openDropdown() {
    dropdownContent.style.display = 'block';
    dropdownContent.style.display = 'flex';

    isDropdownActive = true;
};

function closeDropdown() {
    dropdownContent.style.display = 'none';

    isDropdownActive = false;
};

// Fim do dropdown
function getData(index) {
    var idCompanyVar = sessionStorage.ID_EMPRESA;
    
    fetch("/servers/getServers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idCompanyServer: idCompanyVar
        })
    }).then((answer) => {
        console.log(answer);

        if(answer.ok) {
            console.log("A requisição foi um sucesso!");

            answer.json().then(json => {
                var data = []
                
                if (sessionStorage.SERVERS) {
                    data = JSON.parse(sessionStorage.SERVERS)
                }

                var remover = data.filter(s => {                    
                    if(json.filter(ds => ds.idServidor == s.idServidor).length == 0) {
                      return s
                    }
                })

                if(index) {
                    setTable(json);
                    deleteTable(remover);
                    lidarGraficos(json)

                    setLinks(json);
                    deleteLinks(remover);
                } else {
                    setLinks(json);
                    deleteLinks(remover);
                }

                sessionStorage.SERVERS = JSON.stringify(json)
            });
        } else {
            console.log("ERROR: answer is not ok");
        }
    }).catch((answer) => {
        console.log(`Erro: ${answer}`);
    });
}

var serverLinks = document.getElementById("server_links");

function setLinks(data) {
    for (let i in data) {
        var aServerLink = document.getElementById(`aServerLink#${data[i].idServidor}`)

        if (!aServerLink) {
            serverLinks.innerHTML += 
            `
                <li id="liServerLink#${data[i].idServidor}"><a id="aServerLink#${data[i].idServidor}" href="./servidores.html?idServer=${data[i].idServidor}" class="nav-link text-left options-menu" role="button"><i class="bi bi-hdd"></i>${data[i].modelo}</a></li>
            `
        } else {
            aServerLink.innerHTML = `<i class="bi bi-hdd"></i>${data[i].modelo}`
        }

    }
};

function deleteLinks(data) {
    for (let i in data) {
        var serverLink = document.getElementById(`liServerLink#${data[i].idServidor}`)
        serverLink.parentNode.removeChild(serverLink)
    }
}

// Sair da dashboard

var btnExit = document.getElementById('btn_exit');

btnExit.addEventListener("click", () => {
    sessionStorage.clear();
    window.location = "../login.html"
})