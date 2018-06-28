window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    var game = new Game("canvas");
    game.start();
    document.getElementById("start-button").disabled = "true";
    document.getElementsByClassName("intro")[0].style.display="none";
}
}