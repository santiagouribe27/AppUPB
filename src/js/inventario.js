(function() {
	
var laminasInventario, album, reinicio;


album = [document.getElementsByClassName("album")[0],document.getElementsByClassName("albumCuento")[0]];
reinicio = document.getElementById("clickReset");
laminasInventario = [];

reinicio.addEventListener("click",reiniciarLocalStorage);
for (var i = 0; i<album.length; i++) {
	album[i].addEventListener("click",llenarInventario);
}


function reiniciarLocalStorage(){
	localStorage.clear();
}

function llenarInventario(){
	laminasInventario[0] = JSON.parse(localStorage.getItem("laminas_c1"));
	laminasInventario[1] = JSON.parse(localStorage.getItem("laminas_c2"));
	laminasInventario[2] = JSON.parse(localStorage.getItem("laminas_c3"));
	inventarioCuento1();
	inventarioCuento2();
	inventarioCuento3();
}

function inventarioCuento1(){
	if (laminasInventario[0]!=null) {
		for(var i = 0; i < laminasInventario[0].length; i++){
			if(laminasInventario[0][i] == "1"){
				document.getElementById("LaminaBota").classList.remove("hidden");
			}else if(laminasInventario[0][i] == "2"){
				document.getElementById("LaminaAristizabal").classList.remove("hidden");
			}else if(laminasInventario[0][i] == "3"){
				document.getElementById("LaminaMundo").classList.remove("hidden");
			}else if(laminasInventario[0][i] == "4"){
				document.getElementById("LaminaNacional").classList.remove("hidden");
			}
		}
	}
}

function inventarioCuento2(){
	if(laminasInventario[1]!=null){
		for(var i = 0; i < laminasInventario[1].length; i++){
			if(laminasInventario[1][i] == "1"){
				document.getElementById("LaminaPibe").classList.remove("hidden");
			}else if(laminasInventario[1][i] == "2"){
				document.getElementById("LaminaColombia").classList.remove("hidden");
			}else if(laminasInventario[1][i] == "3"){
				document.getElementById("LaminaLiga").classList.remove("hidden");
			}
		}
	}
}

function inventarioCuento3(){
	if (laminasInventario[2]!=null) {
		for(var i = 0; i < laminasInventario[2].length; i++){
			if(laminasInventario[2][i] == "1"){
				document.getElementById("LaminaLibertadores").classList.remove("hidden");
			}else if(laminasInventario[2][i] == "2"){
				document.getElementById("LaminaMedellin").classList.remove("hidden");
			}else if(laminasInventario[2][i] == "3"){
				document.getElementById("LaminaRene").classList.remove("hidden");
			}
		}
	}
}
})();
