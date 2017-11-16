(function() {
var seccionId;
inicializarMenu();

var laminas_c1 =[];
laminas_c1[0]=document.getElementById("lamina_1_c1");
laminas_c1[1]=document.getElementById("lamina_2_c1");
laminas_c1[2]=document.getElementById("lamina_3_c1");
//laminas_c1[3]=document.getElementById("");


function inicializarMenu(){
    // menuIntro = document.getElementsByClassName("opCuento");
    // seccionId = document.getElementsByClassName("opCuento")[0].getAttribute("id");
    // console.log(seccionId);
     initMenu();
 }


function initMenu(){
    seccion = document.getElementsByClassName("opCuento");
    
    for (var i = 0; i< seccion.length; i++) {
            document.getElementById(seccion[i].id).addEventListener("click",function(){
            cambioMenu(this.id);
            cargarLaminasMenuOpciones(this.id);
        });
    }      
}

function cambioMenu(id) {
    document.getElementById("swipeMenu").classList.add("hidden");
    var menuCuento = document.getElementById("swipeMenuCuento");
    menuCuento.classList.remove("hidden");
    document.getElementById("menuCuento").src = "img/Menu"+ id.split("_c")[1]+".png";

    if (id == "intro_c1") {
        document.getElementById("div_cuento1").className="hidden";
        document.getElementById("div_cuento2_cuento3").className="hidden";
    }
    else if (id == "intro_c2" || id == "intro_c3"){
        document.getElementById("div_cuento1").className="hidden";
        document.getElementById("div_cuento2_cuento3").className="hidden";
    }
}

function cargarLaminasMenuOpciones(id){  
    
    if (id =="intro_c1") {
        var laminas_ls   = JSON.parse(localStorage.getItem("laminas_c1"));
        if (laminas_ls != null) {
            var leng = laminas_ls.length;
                var i ;
                for (i=0;i<leng;i++){
                   document.getElementById("lamina_menu_" + laminas_ls[i]).src = "img/cuento1/LaminaC1-0"+laminas_ls[i]+".png";
                   document.getElementById("lamina_menu_"+laminas_ls[i]).classList.remove("hidden");           
                }
            }
    }
            
    else if (id =="intro_c2") {
        var laminas_ls_c2 = JSON.parse(localStorage.getItem("laminas_c2"));
        if (laminas_ls_c2 != null) {
            var leng = laminas_ls_c2.length;
            var i ;
            for (i=0;i<leng;i++){
              document.getElementById("lamina_m_" + laminas_ls_c2[i]).src = "img/cuento2/LaminaC2-0"+laminas_ls_c2[i]+".png";
              document.getElementById("lamina_m_"+laminas_ls_c2[i]).classList.remove("hidden");
            }
        }
    }

    else if (id =="intro_c3") {
        var laminas_ls_c3 = JSON.parse(localStorage.getItem("laminas_c3"));
        if (laminas_ls_c3 != null) {
            var leng = laminas_ls_c3.length;
            var i ;
            for (i=0;i<leng;i++){
              document.getElementById("lamina_m_" + laminas_ls_c3[i]).src = "img/cuento3/LaminaC3-0"+laminas_ls_c3[i]+".png";
              document.getElementById("lamina_m_"+laminas_ls_c3[i]).classList.remove("hidden");
            }
        }
    }
}
})();
