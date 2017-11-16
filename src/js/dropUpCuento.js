(function() {
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
})();