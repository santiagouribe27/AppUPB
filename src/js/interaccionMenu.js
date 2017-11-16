(function() {
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
