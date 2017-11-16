(function() {
	
init();

function init(){
	document.getElementById("target_1").addEventListener("click",procesarClick);
	document.getElementById("target_2").addEventListener("click",procesarClick);
	document.getElementById("btn_agregar").addEventListener("click",procesarClick);
	document.getElementById("btn_agregar2").addEventListener("click",procesarClick);
	
}


function procesarClick(evt){
	 str = evt.target.id;
	 if(str == "target_1"){//pagina1
		document.getElementById("lamina_tapas").setAttribute("class","tapas animated flipInY");
		document.getElementById("target_1").classList.add("hidden");
		setTimeout(function(){
			document.getElementById("lamina_tapas").classList.add("hidden");
			document.getElementById("target_1").classList.remove("hidden");
		},10000);
	}
	if(str == "target_2"){//pagina2
		document.getElementById("lamina_pibe").setAttribute("class","pibe animated fadeIn");
		document.getElementById("target_2").classList.add("hidden");
		setTimeout(function() {
			document.getElementById("cuadro").setAttribute("class","cuadro animated hinge");
		}, 400);	
		document.getElementById("lamina_pibe").addEventListener("click",function(){agregarLaminaC2(1);});

		setTimeout(function(){document.getElementById("cuadro").classList.add("hidden")},1805);
		document.getElementById("lamina_pibe").addEventListener("click",function(){this.classList.add("hidden");});
		setTimeout(function(){
			document.getElementById("success").classList.add("hidden");
			document.getElementById("cuadro").classList.remove("hidden");
			document.getElementById("cuadro").classList.remove("hinge");
			document.getElementById("target_2").classList.remove("hidden");
			document.getElementById("lamina_pibe").classList.add("hidden");
		},25000);
	}if (str == "btn_agregar2") {//pagina4
		document.getElementById("lamina_col").classList.remove("hidden");
		document.getElementById("btn_agregar2").classList.add("hidden");
		document.getElementById("lamina_col").addEventListener("click",function(){document.getElementById("success_3").classList.remove("hidden");});
		document.getElementById("lamina_col").addEventListener("click",function(){this.classList.add("hidden");});
		document.getElementById("lamina_col").addEventListener("click",function(){agregarLaminaC2(2);});
	}
	if (str == "btn_agregar") {//pagina6
		document.getElementById("lamina_copa").classList.remove("hidden");
		document.getElementById("btn_agregar").classList.add("hidden");
		document.getElementById("lamina_copa").addEventListener("click",function(){document.getElementById("success_2").classList.remove("hidden");});
		document.getElementById("lamina_copa").addEventListener("click",function(){this.classList.add("hidden");});
		document.getElementById("lamina_copa").addEventListener("click",function(){agregarLaminaC2(3);});
		setTimeout(function(){
			document.getElementById("success_2").classList.add("hidden");
			document.getElementById("btn_agregar").classList.remove("hidden");
			document.getElementById("lamina_copa").classList.add("hidden");
		},15000);
	}
}


function agregarLaminaC2(numero_lamina){
	document.getElementById("success").setAttribute("class","success animated jackInTheBox");
	var laminas_c2 = JSON.parse(localStorage.getItem("laminas_c2"));
	if(laminas_c2==null) {
        laminas_c2=[];
    }
   
   if(laminas_c2.indexOf(numero_lamina) == -1) {
     laminas_c2.push(numero_lamina);
     localStorage.setItem("laminas_c2",JSON.stringify(laminas_c2));
    }
    cargarLaminasMenuC2()
}

function cargarLaminasMenuC2(){
	var laminas_ls = JSON.parse(localStorage.getItem("laminas_c2"));
	if (laminas_ls != null) {
		var leng = laminas_ls.length;
		var i ;
		for (i=0;i<leng;i++){
		  document.getElementById("lamina_m_" + laminas_ls[i]).src = "img/cuento2/LaminaC2-0"+laminas_ls[i]+".png";
		  document.getElementById("lamina_m_"+laminas_ls[i]).classList.remove("hidden");
	    
	}
  }
}

})();