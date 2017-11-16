(function() {
    
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
