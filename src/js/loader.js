(function() {
    
window.onload = function(){
    loader();
    timer();
}

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
})();


