var db = require('../db');

module.exports = {
  messages: {
    get: function (/* INPUT PARAM? */) {
       db.connection.query(`
          SELECT message, user_name 
            FROM  messages m
            INNER JOIN users u
              ON messages.user_id = users.user_id; 
        `)
    }, // a function which produces all the messages
    post: function (messageObject) { // a function which can be used to insert a message into the database

      db.connection.query(`
        (CASE
            WHEN ${messageObject.username} NOT IN (
              SELECT user_name
              FROM users
            ) THEN
                INSERT INTO users (user_id, user_name, user_karma)
                VALUES (AUTO_INCREMENT user_id, ${messageObject.username}, 0)
            WHEN ${messageObject.username} NOT IN (
              SELECT user_name
              FROM users
            ) AND ${messageObject.roomname} NOT IN (
              SELECT room_name
              FROM chat_rooms
            ) THEN
                INSERT INTO users (user_id, user_name, user_karma)
                  VALUES (AUTO_INCREMENT user_id, ${messageObject.username}, 0);
                INSERT INTO chat_rooms (room_id, room_name, room_description)
                  VALUES (AUTO_INCREMENT room_id, ${messageObject.roomname}, 'new room');
            WHEN ${messageObject.roomname} NOT IN (
              SELECT user_id
              FROM users
            ) THEN 
                INSERT INTO chat_rooms (room_id, room_name, room_description)
                  VALUES (AUTO_INCREMENT room_id, ${messageObject.roomname}, 'new room');
        ) 

        INSERT INTO messages (message_id, message, createdAt, user_id, room_id)
          VALUES (AUTO_INCREMENT message_id, ${messageObject.text}, ${Date.now}, 
            SELECT user_id FROM users WHERE user_name = ${messageObject.username},
            SELECT room_id FROM chat_rooms WHERE room_name = ${messageObject.roomname});
    `)
  },

  users: {
    // Ditto as above.
    get: function (userObject) {
      db.connection.query(`
        SELECT user, messages 
          FROM users
          JOIN messages
          ON users.user_id = messages.user_id
          WHERE 
            SELECT user_id 
            FROM users 
            WHERE ${userObject.username} = user_name;


      `)

    },
    post: function () {
      db.connection.query(` INSERT INTO users (user_id, user_name, user_karma)
                VALUES (AUTO_INCREMENT user_id, ${messageObject.username}, 0)`)
    }
  },

  chat_rooms : {
    get: function (roomObject) {
      bd.connection.query(`
        SELECT roomname, messages
          FROM chat_rooms
          JOIN messages
          ON messages.room_id = chat_rooms.room_id
          WHERE
            SELECT room_id
            FROM chat_rooms
            WHERE ${roomObject.roomname} = room_name;
      `)
    },
    post: function () {
      db.connection.query(` INSERT INTO chat_rooms (room_id, room_name, room_description)
                VALUES (AUTO_INCREMENT room_id, ${messageObject.roomname}, 'a new room')`)
    }

}

}

}