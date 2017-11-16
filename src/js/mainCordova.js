/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    loader();
    timer();
function loader() {
    var elem = document.getElementById("bar"); 
    var width = 1;
    var id;

    if(!sessionStorage.getItem('loaded'))
        id = setInterval(frame, 25)
    else
    id = setInterval(frame,8)    

    function frame() {
        if (width >= 65) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width+ '%'; 
        }
    }
}

function timer(){
    if(!sessionStorage.getItem('loaded')){
        setTimeout(reveal, 2000);
        sessionStorage.setItem('loaded',true);        
    }
    else
        setTimeout(reveal, 600);
}

function reveal() {
    //Lógica para revelar las secciones 
    document.getElementById("swipeMenu").classList.remove("hidden");
    displayManual();
    document.getElementById("loader").classList.add("hidden");
    display();
}

function displayManual() {
    if(!localStorage.getItem('manual')){
        document.getElementById("manual").classList.remove("hidden");
        localStorage.setItem('manual',true);
    }
}
function display() {
    document.getElementById("intro").classList.remove("hidden");    
}


;(function() {
    

    //Get element reference
    var stage = document.getElementById('dropUp');
    
    //Element Manager
    var mc = new Hammer.Manager(stage);
    
    
    //Recognizer
    var Move = new Hammer.Swipe();
    
    
    //Add the recognizer
    mc.add(Move);
    
    mc.on('swipeup', function(e){
        //Movement
        document.getElementsByName("dropUp")[0].classList.remove("hidden");
        stage.style.transition = "6";
        stage.style.top = "70%";
    })
    
    mc.on('swipedown', function(e){
        //Movement
        document.getElementsByName("dropUp")[0].classList.add("hidden");
        stage.style.top = "95.5%";
    })
})();;(function() {
    
var intro;
var cuento1;
var cuento2;
var cuento3;
var cuentos = document.getElementsByClassName("opCuento");
var inventario;
var laminas;
var vistaActual = 0;
var hammerIntro = [];
var hammerCuento1 = [];
var hammerCuento2 = [];
var hammerCuento3 = [];
var hammerInventario = [];

inicializarVariables();
inicializarMenusDropUp();
asignarEventosExtras();
hammerRecog();

function inicializarVariables() {
    intro = document.getElementsByClassName("intro");
    cuento1 = document.getElementsByClassName("cuento_1");
    cuento2 = document.getElementsByClassName("cuento_2");
    cuento3 = document.getElementsByClassName("cuento_3");
    inventario = document.getElementsByClassName("inventario");
}

function hammerRecog() {
    //Cada array corresponde a las vistas que deben controlar.
    inicializarHammer(hammerIntro, intro);
    inicializarHammer(hammerCuento1, cuento1);
    inicializarHammer(hammerCuento2, cuento2);
    inicializarHammer(hammerCuento3, cuento3);
    inicializarHammer(hammerInventario, inventario);

}

function inicializarHammer(hammer, data) {
    for (i = 0; i < data.length; i++) {
        hammer[i] = new Hammer(data[i]);
        if (i == 0)
            hammer[i].add(new Hammer.Swipe({ event: "leftSwipe", direction: Hammer.DIRECTION_LEFT }));
        else if (i == hammer.length)
            hammer[i].add(new Hammer.Swipe({ event: "rightSwipe", direction: Hammer.DIRECTION_RIGHT }));
        else
            hammer[i].add(new Hammer.Swipe({ event: "rightSwipe leftSwipe", direction: Hammer.DIRECTION_RIGHT }));
    }
    initEventos(hammer, data);
}

function initEventos(hammer, data) {
    //Cada objeto cambia la pagina solo si se hace el swipe a la izquierda o a la derecha
    for (i = 0; i < hammer.length; i++) {
        hammer[i].on('swiperight swipeleft', function (evt) {
            var mov = (evt.type == "swipeleft") ? 1 : -1;
            var posFinal = vistaActual + mov;
            //Se llama a la funcion que cambia la pagina y se le pasan como parámetro
            //la posición final, la posición actual y el arreglo en el que debe actuar
            if (posFinal >= 0 && posFinal <= hammer.length - 1) {                
                cambiarSeccion(posFinal, vistaActual, data, mov);
            }
        });
    }
}

function cambiarSeccion(posF, pos, array, mov) {
    if (mov > 0) {
        array[posF].classList.add("slideInRight");
        array[posF].classList.remove("slideInLeft");
    } else {
        array[posF].classList.add("slideInLeft");
        array[posF].classList.remove("slideInRight");
    }
    array[pos].classList.add("hidden");
    array[posF].classList.remove("hidden");
    vistaActual = posF;
}

animacion();

function animacion() {
    for (var i = 0; i < cuentos.length; i++) {
        cuentos[i].addEventListener("click", function () {
            //nueva vista, luego mientras las vistas estén ocultas, se deben
            //resetear las clases que se añadieron para que no afecten.
            ocultarCuentos(this);
            abrirCuento(this);
        });
    }
}

function abrirCuento(cuento) {
    animacionApertura(cuento);
    setTimeout(function () {
        cuento.parentElement.classList.add("hidden");
        document.getElementById(cuento.id.split("_")[1] + "_portadilla").classList.remove("hidden");
        vistaActual = 0;
    }, 3000);
}

function ocultarCuentos(cuento) {
    for (var i = 0; i < cuentos.length; i++) {
        if (cuento != cuentos[i]) {
            cuentos[i].className = "opCuento lamina-intro animated";
            cuentos[i].classList.add("slideOutUp");
        }
    }
    reset(cuentos);
}

function animacionApertura(cuento) {
    cuento.className = "opCuento lamina-intro animated";
    cuento.classList.add("animacionApertura");
    document.getElementById("bg_seleccion").classList.add("hidden");
    setTimeout(function() {
    document.getElementById("bg_seleccion").classList.remove("hidden");
    
    }, 4000);


}

function reset() {
    var inAnimaciones = ["flipInX", "slideInDown", "slideInLeft", "slideInRight", "slideInUp", "fadeInRight", "fadeInLeft", "fadeInDown"];
    setTimeout(function () {
        for (var i = 0; i < cuentos.length; i++) {
            cuentos[i].classList.remove("slideOutUp");
            cuentos[i].classList.remove("animacionApertura");
            cuentos[i].classList.add(inAnimaciones[Math.round(Math.random()) * (inAnimaciones.length - 1)]);
        }
    }, 3000);
}
function asignarEventosExtras() {
    document.getElementById("btn_cocina").addEventListener("click",incrementoEstado);
}
function incrementoEstado() {
    vistaActual++;
}

function inicializarMenusDropUp() {
    var home = [document.getElementsByClassName("home")[0],document.getElementsByClassName("homeCuento")[0]];
    var ayuda = [document.getElementsByClassName("ayuda")[0],document.getElementsByClassName("ayudaCuento")[0]];
    var album = [document.getElementsByClassName("album")[0],document.getElementsByClassName("albumCuento")[0]];

    eventosDropUp(home,"home");
    eventosDropUp(ayuda,"manual");
    eventosDropUp(album,"inventario");
}

function eventosDropUp(data,seccion) {
    

    for (var i = 0; i < data.length; i++) {
        data[i].addEventListener("click",function(){
            if(seccion == "home")
                location.reload();
            else if(seccion == "manual"){

                document.getElementById("manual").classList.remove("hidden");
                resetCuento(intro);
                resetCuento(cuento1);
                resetCuento(cuento2);
                resetCuento(cuento3);
                resetCuento(inventario); 
            }
                else{
                    inventario[0].classList.remove("hidden");
                    resetCuento(intro);
                    resetCuento(cuento1);
                    resetCuento(cuento2);
                    resetCuento(cuento3);
                }
        });
    }
}

function resetCuento(data) {
    vistaActual = 0;
    for (var i = 0; i < data.length; i++) {
        data[i].classList.add("hidden");
    }
}
})();
;(function() {
var menuIntro;
var hammerMenu = [];
inicializarMenu();

function inicializarMenu(){
    menuIntro = document.getElementsByClassName("intro");
    hammerR(hammerMenu,menuIntro);
}

function hammerR(hammer, data) {
    for (var i = 0; i < data.length; i++) {
        hammer[i] = new Hammer(data[i]);        
        hammer[i].add(new Hammer.Swipe({ event: "rightSwipe leftSwipe", direction: Hammer.DIRECTION_RIGHT }));        
    }
    initMenu(hammer,data);
}

function initMenu(hammer,data){
    //Cada objeto cambia la pagina solo si se hace el swipe a la izquierda o a la derecha
        hammer[0].on('swipeleft',function(){
        document.getElementById("menu").src = "img/dropUp2.png";
        
        });
        hammer[1].on('swiperight',function(){
        document.getElementById("menu").src = "img/dropUp.png";
        
        });
        hammer[2].on('swipeleft',function(){
        document.getElementById("menu").src = "img/dropUp2.png";
        });
        var album = [document.getElementsByClassName("album")[0],document.getElementsByClassName("albumCuento")[0]];
        for (var i = 0; i < album.length; i++) {
            album[i].addEventListener("click",function () {
                document.getElementById("swipeMenuCuento").classList.add("hidden");
                document.getElementById("swipeMenu").classList.remove("hidden");
                document.getElementById("menu").src = "img/dropUp3.png";
            });
        }
    }
})();
;(function() {
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
;(function() {
	
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
})();;(function() {
	
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

})();;(function() {
    
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
;(function() {
	
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
;(function() {
  
var gol = document.getElementsByClassName('expand')[0];
var ham = new Hammer( gol, {
  domEvents: true
} );

ham.get('pinch').set({ enable: true });

ham.on( 'pinch', function( e ) {
    gol.src = "img/cuento2/gol2.png";
    document.getElementById("btn_agregar2").classList.remove("hidden");
  setTimeout(function() {
    gol.src = "img/cuento2/gol.png";
    document.getElementById("success_3").classList.add("hidden");
    document.getElementById("lamina_col").classList.add("hidden");  
  }, 25000);    
});
})();

;(function() {
    var stage = document.getElementById('dropUpCuento');

var mc = new Hammer.Manager(stage);

var Move = new Hammer.Swipe();
mc.add(Move);
mc.on('swipeup', function(e){
    //Movement
    document.getElementsByName("dropUp")[1].classList.remove("hidden");  
    if(document.getElementById("menuCuento").src.includes("Menu1"))
        document.getElementById("div_cuento1").classList.remove("hidden");
    else
        document.getElementById("div_cuento2_cuento3").classList.remove("hidden");
    
    stage.style.transition = "6";
    stage.style.top = "56%";
})
mc.on('swipedown', function(e){
    //Movement
    document.getElementsByName("dropUp")[1].classList.add("hidden"); 
    if(document.getElementById("menuCuento").src.includes("Menu1"))    
        document.getElementById("div_cuento1").classList.add("hidden");
    else
        document.getElementById("div_cuento2_cuento3").classList.add("hidden");
    
    stage.style.top = "96.8%";
})
})();;(function() {
    
   var manual = document.getElementsByName("manual")[0];
   hide(manual);


function hide(obj) {
    manual.addEventListener("click",function () {
        var seccion = document.getElementById(sessionStorage.getItem("seccion"));
        document.getElementById("manual").classList.add("hidden");
        seccion.classList.remove("hidden");
        seccion.classList.add("animated slideInRight");        
    });
    
}
})();
;(function() {
    
var bflat = new Audio();
var bflat2 = new Audio();

var bgSound = "sound/bg/bg.mp3";
// AUDIOS CUENTO 1
var tv = "sound/Cuento1/televisor (2-6).mp3";
var tvSeñal = "sound/Cuento1/tvSeñal.mp3";
var fuego = "sound/Cuento1/fuego-cocina(3).mp3";
var puerta = "sound/Cuento1/puerta(4).mp3";
var balon = "sound/Cuento1/balon (5).wav";
var respiracion = "sound/Cuento1/Respiracion rapida(7).mp3";
var correa = "sound/Cuento1/correa-latigo (8).wav";
// AUDIOS CUENTO 2
var silbato = "sound/Cuento2/silbato_3(1).mp3";
var pelota = "sound/Cuento2/Chutando pelota (2).mp3";
var gol = "sound/Cuento2/gol(4).wav";
var viento = "sound/Cuento2/viento_en_los_arboles(5).mp3";
var ambienteFutbol = "sound/Cuento2/Ambiente Partido de Futbol (6).mp3";
var vapor = "sound/Cuento2/vapor(7).wav";

// AUDIOS CUENTO 3
var guitarra = "sound/Cuento3/guitarra(1).wav";
var apertura = "sound/Cuento3/apertura(2).wav";
var partidoGol = "sound/Cuento3/Partido de futbolGOL (3).mp3";
var corazon = "sound/Cuento3/latido.mp3";
var extasis = "sound/Cuento3/extasis(5).wav";
var estadio = "sound/Cuento3/estadio(7).mp3";


inicializarEventoAudios();

if(!sessionStorage.getItem("Off"))
    playBg();
    play(bflat,bgSound,true,2000);


function inicializarEventoAudios() {
    var on = document.getElementsByClassName("On");
    var off = document.getElementsByClassName("Off");
    
    for (var i = 0; i < on.length; i++) {
        on[i].addEventListener("click",function() {
            sessionStorage.setItem("Off",false);
            playBg();
        });
    }
    for (var i = 0; i < on.length; i++) {
        off[i].addEventListener("click",function() {
            sessionStorage.setItem("Off",true);
            pause();
        });
    }
    addListener("clickTv_c1",tv,10,0,false);
    addListener("btn_cocina",fuego,10,0,false);
    addListener("pan_c1",puerta,10,0,false);
    addListener("balonSound",balon,10,0,false);
    addListener("img_tv",tvSeñal,15,2,false);
    addListener("resp",respiracion,10,1,false);
    addListener("marcador",correa,10,0,false);

    addListener("silbatoSound",silbato,10,0,true);
    addListener("target_2",pelota,5,0,false);
    addListener("golSound",gol,20,0,false);
    addListener("vientoSound",viento,10,0,false);
    addListener("btn_agregar",ambienteFutbol,10,0,false);
    addListener("vaporSound",vapor,4,0,true);

    addListener("c3_p1A",guitarra,7,0,false);
    addListener("btn_c3_p2",apertura,10,0,false);
    addListener("c3_p3A",partidoGol,10,0,false);
    addListener("c3_p4A",corazon,10,0,false);
    addListener("c3_p5A",extasis,10,0,false);
    addListener("c3_p7A",estadio,10,0,false);
    
}

function play(audio,sound,loop,timer) {
    setTimeout(function () {
    audio.src = sound;
    audio.loop = loop;
    if(loop)
        audio.volume = 0.4;
    audio.play();
    }, timer);
}
function pause() {
    bflat.pause();
}
function playBg() {
    bflat.play();
}

function addListener(id,data,time,timeOut,loop) {
    document.getElementById(id).addEventListener("click",function () {
        setTimeout(function() {
            play(bflat2,data, loop, 10);
            bflat.volume = 0.16;
        }, timeOut*1000);
        setTimeout(function() {
            bflat.volume = 0.4;
        }, time*1000);

        });
        
        bflat2.ontimeupdate =  function () {
            if(Math.round(bflat2.currentTime) == time)
                bflat2.pause();
        }
}
})();

}};

