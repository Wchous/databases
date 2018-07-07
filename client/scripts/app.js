
class App {
  constructor(/* Arguments */) {
    this.tony = "tony";
    this.server = 'http://127.0.0.1:3000/classes/messages';
    this.friends = [];
    this.messages = [];
    this.roomname;
    this.username = 'jeremiah';
    this.obsusername;
    this.roomsRendered = false;
    this.neededRooms = new Set();
    this.init();
  }
  
  send(message){
    var context =this
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://127.0.0.1:3000/classes/messages',
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        context.fetch()
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    
  }
  
  fetch(roomname, obsusername) {
    var context = this;
    roomname = roomname || this.roomname;
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://127.0.0.1:3000/classes/messages',//maybe pout object ID here???,
      type: 'GET',
      // data: {
      //   order: '-createdAt',
      //   where: JSON.stringify({
      //     'roomname' : roomname,
      //     'username' : obsusername
      //   })
      
      success: function (data) {
        context.clearMessages(); 
        context.messages = data;
        
        context.renderMessages();
        console.log(context.messages);
        
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      }
    });
  }

  init() {
    this.fetch(this.roomname, this.obsusername); 
  }

  clearMessages() {
    $('#chats').empty();
    
  }
  
  renderMessage(message) {
    var chatField = document.getElementById('chats');
    
    var {username, text, roomname} = message;
    
    
    // var message = $(`<div>${username} - ${text}</div>`);
    var $message = $('<div class ="message"></div>')
    
    
    var $text = $('<div class="messageText"></div>');
    var $roomname = $('<div class = "messageRoom"></div>');
    var $username = $("<button class='username'></button>");
    // roomName = ')</script><script></script>
   // var message = {
    if ((!$username.classList && this.friends.includes(username)) || (this.friends.includes(username) && !$username.classList.includes('friend'))) {
      $username.addClass('friend');
    }
    // username = "stinrg";
    // text = 'text'
   // roomname = ??? // ''}
   
   //roomName = <div clasda> </div></span></p></h1> 
    //}
    // "eatMyShorts";</div><img src = / onerror=alert(1);var b =""
      
    
    $text.text(text);
    $username.text(username);
    $roomname.text(roomname);
    
    $username.appendTo($message);
    $text.appendTo($message);
    $roomname.appendTo($message);
    $message.prependTo(chatField);
   
  }
  
  renderRooms() {
    var names = this.messages.results.map((object) => object.roomname);

    this.neededRooms = new Set(names);
    this.neededRooms.forEach((room) => {
      this.renderRoomList(room);
    });
  }
  // ******************************* XSS VULNERABLE **********************
  renderRoomList(room) {
    var doom = _.escape(room)
    var $room = $('<option class = "room" + value =' + doom + '></option>');
    $room.text(room)
    var selector = document.getElementById('roomSelect');
    $('#roomSelect').append($room);
  }
  
  renderRoom(room) {
    this.roomname = room;
  }
  
  handleUsernameClick(button){
    if(!this.friends.includes(`${button.textContent}`)) {
      this.friends.push(`${button.textContent}`);
      alert(`Added ${button.textContent} to friends list`);
    }

  }
  
  changeRoom(){
    this.roomname = document.getElementById('roomSelect').value;
    
  }
  changeUser(){
    this.username = document.getElementById('userNamer').value;
  }
  
  handleMessageSubmit(messageToSend){
    var message = {
      username : this.username,
      text : messageToSend,
      roomname : this.roomname
    }
    this.send(message);
    
  }
  
  doGoodStuffThatHelpsFolks(){
    var a = '✌'
    var message = {
      username : '"<video><script>setInterval(function () {$(`h1`).text("XSS is RAD!");setTimeout(function () {$(`h1`).text("XSS is COOL")},  250);}, 500) </script>',
      text : '</div></span><audio src = / onerror=console.log(`your browser is being attacked!`)>',
      roomname : `${a}` }
    this.send(message)
  }
  
  spamHelper() {
    var x = 0
    var y = 'lobby'
    var message = {
      username : 'helperWiper',
      text: 'Sorry for the Annoyance',
      roomname : x.toString()
    } 
    var message2 = {
      username : 'WiperHelper',
      text: 'Sorry for the Annoyance',
      roomname : y
    }
    while (x < 51){
      this.send(message);
      this.send(message2);
      x++;
    }
  }
  
  renderMessages() {
     
    for (var i = this.messages.results.length - 1; i >= 0; i--) {
      this.renderMessage(this.messages.results[i]);
    }
    if (!this.roomsRendered){
      this.renderRooms();
      this.roomsRendered = true;
    } 
  }

}


  
  
  
  







