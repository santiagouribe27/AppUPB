(function() {
  
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

