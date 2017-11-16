(function() {
	
	var puertaC1, clicks,televisor,btn_cocina,flecha, panP5, hammerPan, fondoP5, posicion, textos, hammerTextos, marcadores, hammerMarcadores, laminaMarcador;
	
	var laminas = [];
	
	laminas[0] = document.getElementById("lamina_1_c1");
	laminas[1] = document.getElementById("lamina_2_c1");
	laminas[2] = document.getElementById("lamina_3_c1");
	laminas[3] = document.getElementById("lamina_4_c1");
	
	flecha = document.getElementById("flecha");
	btn_cocina = document.getElementById("btn_cocina");
	televisor = document.getElementById("img_tv");
	puertaC1 = document.getElementById("puertaCerrada_c1");
	
	clicks = [];
	clicks[0] = document.getElementById("timbre_c1");
	clicks[1] = document.getElementById("clickTv_c1");
	
	laminaMarcador = false;
	marcadores = [];
	marcadores[0] = document.getElementById("marcador8");
	marcadores[1] = document.getElementById("marcador9");
	marcadores[2] = document.getElementById("swipeMarcador");
	
	hammerMarcadores = [];
	hammerMarcadores[0] = new Hammer(marcadores[0]);
	hammerMarcadores[1] = new Hammer(marcadores[1]);
	hammerMarcadores[2] = new Hammer(marcadores[2]);
	hammerMarcadores[3] = new Hammer(laminas[3]);
	
	hammerMarcadores[0].get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	hammerMarcadores[1].get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	hammerMarcadores[2].get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	hammerMarcadores[3].get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	
	
	hammerMarcadores[0].on("swipeup",function(evt){
		marcadores[0].className = "marcadores animated fadeOut";
		marcadores[1].className = "marcadores animated fadeInUp";
		marcadores[0].classList.add("hidden");
	});
	
	hammerMarcadores[1].on("swipedown swipeup",function(evt){
		if(evt.type == "swipedown"){
			marcadores[1].className = "marcadores animated fadeOut";
			marcadores[0].className = "marcadores animated fadeInDown";
			marcadores[1].classList.add("hidden");
		}else if (evt.type == "swipeup") {
			if (!laminaMarcador) {
				marcadores[1].className = "marcadores animated fadeOut";
				laminas[3].className = "animated fadeInUp";
				laminas[3].style.zIndex = 3;
			}else{
				marcadores[1].className = "marcadores animated fadeOutUp";
			}
			marcadores[2].className = "animated fadeInUp";
			setTimeout(function(){
				marcadores[1].classList.add("hidden");
			},300);
		}
	});
	
	hammerMarcadores[2].on("swipedown",function(evt){
		marcadores[2].className = "animated fadeOut";
		if (!laminaMarcador){
			laminas[3].className = "animated fadeOut";
			laminas[3].style.zIndex = 1;
		}
		marcadores[1].className = "marcadores animated fadeInDown";
		marcadores[2].classList.add("hidden");
	});
	
	hammerMarcadores[3].on("swipedown",function(evt){
		marcadores[2].className = "animated fadeOut";
		if (!laminaMarcador){
			laminas[3].className = "animated fadeOut";
			laminas[3].style.zIndex = 1;
		}
	marcadores[1].className = "marcadores animated fadeInDown";
	marcadores[2].classList.add("hidden");
});




fondoP5 = document.getElementById("fondoP5_c1");
fondoP5.style.marginLeft = "100px";
panP5 = document.getElementById("pan_c1");
hammerPan = new Hammer(panP5);
posicion = 0;

textos = document.getElementsByClassName("img_cuadro_texto");
hammerTextos = [];
hammerTextos[0] = new Hammer(textos[0]);
hammerTextos[1] = new Hammer(textos[1]);

hammerTextos[0].get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
hammerTextos[1].get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });


laminas[0].addEventListener("click", function(){agregarLamina(1);});
laminas[1].addEventListener("click", function(){agregarLamina(2);});
laminas[2].addEventListener("click", function(){agregarLamina(3);});
laminas[3].addEventListener("click", function(){agregarLamina(4);});



btn_cocina.addEventListener("click",pasarCocina);
televisor.addEventListener("click",tumbarTv);

clicks[0].addEventListener("click",tocarPuerta);
clicks[1].addEventListener("click",prenderTv);

hammerPan.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

hammerPan.on("panstart", function(evt) {
	posicion = parseInt(fondoP5.style.marginLeft);
});


hammerPan.on("panleft panright", function(evt) {
	trasladar(evt.deltaX);
});

hammerPan.on("panend", function(evt) {
	if(parseInt(fondoP5.style.marginLeft) > 100){
		fondoP5.style.marginLeft = "100px";
	}else if(parseInt(fondoP5.style.marginLeft) < -150){
		fondoP5.style.marginLeft = "-150px";
	}
});

hammerTextos[0].on("swipeup",function(evt){
	textos[0].className = "img_cuadro_texto animated fadeOut";
	textos[1].className = "img_cuadro_texto animated fadeInUp";
	textos[0].classList.add("hidden");
	
});

hammerTextos[1].on("swipedown",function(evt){
	textos[1].className = "img_cuadro_texto animated fadeOut";
	textos[0].className = "img_cuadro_texto animated fadeInDown";
	textos[1].classList.add("hidden");
});


function trasladar(deltaX){
	if (parseInt(fondoP5.style.marginLeft) <= 100 && parseInt(fondoP5.style.marginLeft) >= -150) {
		if (parseInt(fondoP5.style.marginLeft) > -45 && parseInt(fondoP5.style.marginLeft) < 55) {
			laminas[1].style.zIndex = 3;
		}else{
			laminas[1].style.zIndex = 0;
		}
		fondoP5.style.marginLeft = Math.ceil(posicion+deltaX) + 'px';
	}
}

function agregarLamina(numero_lamina){
	var laminas = JSON.parse(localStorage.getItem("laminas_c1"));
	if(laminas==null) {
		laminas=[];
    }
	if(laminas.indexOf(numero_lamina) == -1) {
		laminas.push(numero_lamina);
		localStorage.setItem("laminas_c1",JSON.stringify(laminas));
    }
    document.getElementById("mensaje_lamina_"+numero_lamina).className = "mensaje_lamina_"+numero_lamina+" animated fadeIn";
    document.getElementById("lamina_"+numero_lamina+"_c1").classList.add("fadeOut");
    setTimeout(function(){
		document.getElementById("lamina_"+numero_lamina+"_c1").classList.add("hidden");
    	document.getElementById("mensaje_lamina_"+numero_lamina).classList.remove("fadeIn");
    	document.getElementById("mensaje_lamina_"+numero_lamina).classList.add("fadeOut");
    },3000);
    setTimeout(function() {
		document.getElementById("mensaje_lamina_"+numero_lamina).className = "mensaje_lamina_"+numero_lamina+" animated hidden";
    }, 6000);
    if (numero_lamina == 3) {
		setTimeout(function() {
			televisor.className = "img_tv";
		}, 5000);
		setTimeout(function() {
         	document.getElementById("lamina_3_c1").classList.add("hidden");
		}, 7000);
    }else if (numero_lamina == 4) {
		laminaMarcador = true;
    }
    cargarLaminasMenu();
}

function cargarLaminasMenu(){
	var laminas_ls	 = JSON.parse(localStorage.getItem("laminas_c1"));
	if (laminas_ls != null) {
		var leng = laminas_ls.length;
		var i ;
		for (i=0;i<leng;i++){
			document.getElementById("lamina_menu_" + laminas_ls[i]).src = "img/cuento1/LaminaC1-0"+laminas_ls[i]+".png";
			document.getElementById("lamina_menu_"+laminas_ls[i]).classList.remove("hidden");
		    
		}
	}
}


function pasarCocina(evt){
	document.getElementById("c1_3").classList.add("hidden");
	document.getElementById("c1_4").classList.remove("hidden");
   document.getElementById("c1_4").classList.add("slideInRight");
}

function tumbarTv(evt){
	
	
	var balon = document.getElementById("balon");
   balon.classList.remove("hidden");
   TweenLite.to(balon, 1.5, {top:350, left:100,onComplete:function(){
	   balon.classList.add("hidden");
	   televisor.className = "img_tv transform";
	   TweenLite.to(balon, 1.0, {top:560, left:260,onComplete:function(){
		   if (!document.getElementById("lamina_3_c1").classList.contains("fadeOut")) {
			   document.getElementById("lamina_3_c1").classList.remove("hidden");
			   document.getElementById("lamina_3_c1").classList.add("fadeIn"); 
			}else{
				document.getElementById("lamina_3_c1").classList.remove("animated");
				setTimeout(function() {
					televisor.className = "img_tv";
				}, 5000);
			}
		}});
		
	}});
	
}

function tocarPuerta(evt) {
	puertaC1.className = "puerta_c1 animated fadeOut";
	setTimeout(function() {
		puertaC1.classList.add("hidden");
	}, 500);
	clicks[0].classList.add("hidden");
	cerrarPuerta();
}
function cerrarPuerta() {
	setTimeout(function () {
		clicks[0].classList.remove("hidden");
		puertaC1.classList.remove("animated","fadeOut","hidden");
	
	},25000);
}

function prenderTv(evt){
	
	laminas[0].className = "animated fadeIn";
	clicks[1].className = "animated fadeOut";
	setTimeout(function(){
		clicks[1].className = "hidden"
	},200);
}
})();