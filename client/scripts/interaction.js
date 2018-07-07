$(document).ready(function(){
  window.app = new App;

  $('body').on('click', '.username', function(e) {
    e.preventDefault();
    app.handleUsernameClick(this)
    app.fetch();
  });
  
  $('#submit').on('click', function(e){
    e.preventDefault();
    var text = document.getElementById('messageInput').value;
    app.handleMessageSubmit(text); 
  });
  
  $('body').on('click', '#refresh', function(e) {
    e.preventDefault();
    app.fetch();
  });
  
  $('#main').on('click', '#lobbyMaker', function (e) {
    e.preventDefault();
    var k = window.prompt("Enter Lobby Name");
    app.renderRoomList(k);
    app.roomname = k
  })
  
});