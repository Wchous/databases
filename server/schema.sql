-- DROP DATABASE chat;
-- CREATE DATABASE chat;

USE chat;


CREATE TABLE chat_rooms(
  room_id INTEGER PRIMARY KEY,
  room_name TEXT,
  room_description TEXT 
);
CREATE TABLE users(
  user_id INTEGER PRIMARY KEY,
  user_name TEXT,
  user_karma INTEGER
);

INSERT INTO chat_rooms(room_id, room_name, room_description)
VALUES (1, 'Tonys Place', 'where tony hangs out');

INSERT INTO users(user_id, user_name, user_karma)
VALUES (1, 'tony', 8000);
CREATE TABLE messages (
  message_id INTEGER PRIMARY KEY,
  message TEXT,
  created_at DATE,
  user_id INTEGER,
  room_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(room_id) REFERENCES chat_rooms(room_id) 
  -- FOREIGN KEY REFERENCES chat_rooms(room_id)
);

INSERT INTO messages (message_id, message, created_at, user_id, room_id)
VALUES (1, 'foo', '06/07/18', 1, 1);

SELECT * FROM messages;




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

