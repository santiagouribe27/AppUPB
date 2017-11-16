(function() {
    
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
