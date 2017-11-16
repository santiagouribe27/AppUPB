(function() {
    
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
