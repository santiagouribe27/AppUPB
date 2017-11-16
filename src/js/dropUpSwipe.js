(function() {
    

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
})();