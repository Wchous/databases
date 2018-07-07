var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
       db.connection.query(`
          SELECT message, user_name 
            FROM  messages 
            LEFT JOIN users 
              ON users.user_id = messages.user_id; 
        `, (err, results, fields) => {
          if (err){
            callback(err)
          }
            callback(null, results)
      })
    }, // a function which produces all the messages
        // CASE
        //     WHEN ${messageObject.username} NOT IN (
        //       SELECT user_name
        //       FROM users
        //     ) THEN
        //         INSERT INTO users (user_id, user_name, user_karma)
        //         VALUES (AUTO_INCREMENT user_id, ${messageObject.username}, 0)
        //     WHEN ${messageObject.username} NOT IN (
        //       SELECT user_name
        //       FROM users
        //     ) AND ${messageObject.roomname} NOT IN (
        //       SELECT room_name
        //       FROM chat_rooms
        //     ) THEN
        //         INSERT INTO users (user_id, user_name, user_karma)
        //           VALUES (AUTO_INCREMENT user_id, ${messageObject.username}, 0)
        //         INSERT INTO chat_rooms (room_id, room_name, room_description)
        //           VALUES (AUTO_INCREMENT room_id, ${messageObject.roomname}, 'new room')
        //     WHEN ${messageObject.roomname} NOT IN (
        //       SELECT user_id
        //       FROM users
        //     ) THEN 
        //         INSERT INTO chat_rooms (room_id, room_name, room_description)
        //           VALUES (AUTO_INCREMENT room_id, ${messageObject.roomname}, 'new room')
        //     ELSE 
        // INSERT INTO messages (message_id, message, createdAt, user_id, room_id)
        //   VALUES (AUTO_INCREMENT message_id, ${messageObject.message}, 12/12/12, 
        //     SELECT user_id FROM users WHERE user_name = ${messageObject.username},
        //     SELECT room_id FROM chat_rooms WHERE room_name = ${messageObject.roomname});
        // INSERT INTO messages (message_id, message, user_id, room_id)
        //   VALUES (7, 'tony says hello', 1, 2);
    post: function (messageObject, callback) { // a function which can be used to insert a message into the database
      db.connection.query(`
        SELECT * FROM messages
    `,  (err, resuts, fields) => {
          if (err){
            callback(err)
            console.log('there has been an error and we dont know what it is')
          } else{
                      callback(results)
                      console.log('message posted')}
      })
  },

  users: {
    // Ditto as above.
    get: function (userObject, callback) {
      db.connection.query(`
        SELECT users.user, messages.message 
          FROM users
          JOIN messages
          ON users.user_id = messages.user_id
          WHERE 
            SELECT user_id 
            FROM users 
            WHERE ${userObject.username} = user_name;


      `, (err, results, fields) => {
          if (err){
            callback(err)
          }
            callback(null, results)
      })

    },
    post: function (userObject, callback) {
      db.connection.query(` INSERT INTO users (user_id, user_name, user_karma)
                VALUES (AUTO_INCREMENT user_id, ${userObject.username}, 0)`
      , (err, results, fields) => {
          if (err){
            callback(err)
          }
            callback(null, results)
      })
    }
  },

  chat_rooms : {
    get: function (roomObject, callback) {
      bd.connection.query(`
        SELECT chat_rooms.roomname, messages.message
          FROM chat_rooms
          JOIN messages
          ON messages.room_id = chat_rooms.room_id
          WHERE
            SELECT room_id
            FROM chat_rooms
            WHERE ${roomObject.roomname} = room_name;
      `, (err, results, fields) => {
          if (err){
            callback(err)
          }
            callback(null, results)
      })
    },
    post: function (callback) {
      db.connection.query(` INSERT INTO chat_rooms (room_id, room_name, room_description)
                VALUES (AUTO_INCREMENT room_id, ${messageObject.roomname}, 'a new room')`
      , (err, results, fields) => {
          if (err){
            callback(err)
          }
            callback(null, results)
      })
    }

}

}

}