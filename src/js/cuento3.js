(function() {
    
init();

var blade1 = false, blade2 = false, blade3 = false;
var estLam = JSON.parse(localStorage.getItem("laminas_c3"));

function init() {
    document.getElementById("btn_c3_p2").addEventListener("click", function(evt) {
        revealBlade(evt.target.id);
    });
    document.getElementById("btn_c3_p2A").addEventListener("click", function(evt) {
        revealBlade(evt.target.id);
    });
    document.getElementById("btn_c3_p6A").addEventListener("click", function(evt) {
        if(existeLamina(2)!=true){
            (document.getElementById("c3_l2")).removeAttribute("hidden");
            document.getElementById("c3_l2").style.zIndex = 19;
            document.getElementById("btn_c3_p6A").setAttribute("hidden", "");
            (document.getElementById("btn_c3_p6B")).removeAttribute("hidden");
            revealBlade(evt.target.id);
        }
    });
    document.getElementById("c3_p7B").addEventListener("click", function(evt) {
        if(existeLamina(3)!=true){
            (document.getElementById("c3_l3")).removeAttribute("hidden");
            (document.getElementById("btn_c3_p7A")).removeAttribute("hidden");
            (document.getElementById("c3_p7A")).setAttribute("class", "zoom1");
            (document.getElementById("c3_l3")).setAttribute("class", "zoom2");
            (document.getElementById("btn_c3_p7A")).setAttribute("class", "zoom2");
            revealBlade(evt.target.id);
        }
    });

    document.getElementById("btn_c3_p2A").addEventListener("click", function () { agregarLaminaC3(1); });
    document.getElementById("btn_c3_p6B").addEventListener("click", function () { agregarLaminaC3(2); })
    document.getElementById("btn_c3_p7A").addEventListener("click", function () { agregarLaminaC3(3); })
}

/**
 * Función que administra las funciones de los botones que revelan las laminas.
 * @param {*} btn id del botón que se está llamando. 
 */
function revealBlade(btn) {
    if (btn == "btn_c3_p2") {
            (document.getElementById("c3_p2A1")).setAttribute("hidden", "");
            (document.getElementById("btn_c3_p2")).setAttribute("hidden", "");
            (document.getElementById("c3_p2A2")).removeAttribute("hidden");
            (document.getElementById("c3_p2A2")).setAttribute("class", "c3_p2m animated flipInY");
            if(existeLamina(1)!=true){
                (document.getElementById("c3_l1")).removeAttribute("hidden");
                (document.getElementById("c3_l1")).setAttribute("class", "animated flipInY");
                (document.getElementById("btn_c3_p2A")).removeAttribute("hidden");
                (document.getElementById("btn_c3_p2A")).setAttribute("class", "animated flipInY");
                document.getElementById("btn_c3_p2A").addEventListener("click", function(evt) {
                    (document.getElementById("c3_l1")).setAttribute("hidden", "");
                    (document.getElementById("btn_c3_p2A")).setAttribute("hidden", "");
                    blade1 = true;
                });
        }
    }
    if (btn == "btn_c3_p6A") {
        document.getElementById("btn_c3_p6B").addEventListener("click", function(evt) {
            (document.getElementById("c3_l2")).setAttribute("hidden", "");
            (document.getElementById("btn_c3_p6B")).setAttribute("hidden", "");
            blade2 = true;
        });
    }
    if (btn == "c3_p7B") {
        document.getElementById("btn_c3_p7A").addEventListener("click", function(evt) {
            document.getElementById("c3_p7B").setAttribute("hidden", "");
            (document.getElementById("c3_l3")).setAttribute("hidden", "");
            (document.getElementById("btn_c3_p7A")).setAttribute("hidden", "");
            (document.getElementById("c3_p7A")).removeAttribute("class", "zoom1");
            blade3 = true;
        });
    }
}

function existeLamina(pos){
    if(estLam!=null){
        for(var i = 0; i<estLam.length; i++){
            if(estLam[i]==pos) 
                return true;
        }
    }
    return false;
}

function agregarLaminaC3(numero_lamina) {
    //document.getElementById("success").setAttribute("class","success animated jackInTheBox");
    var laminas_c3 = JSON.parse(localStorage.getItem("laminas_c3"));
    if (laminas_c3 == null) {
        laminas_c3 = [];
    }

    if (laminas_c3.indexOf(numero_lamina) == -1) {
        laminas_c3.push(numero_lamina);
        localStorage.setItem("laminas_c3", JSON.stringify(laminas_c3));
    }
    cargarLaminasMenuC3();
}

function cargarLaminasMenuC3() {
    var laminas_ls = JSON.parse(localStorage.getItem("laminas_c3"));
    if (laminas_ls != null) {
        var leng = laminas_ls.length;
        for (var i = 0; i < leng; i++) {
            document.getElementById("lamina_m_" + laminas_ls[i]).src = "img/cuento3/LaminaC3-0" + laminas_ls[i] + ".png";
            document.getElementById("lamina_m_" + laminas_ls[i]).classList.remove("hidden");
        }
    }
}
})();
