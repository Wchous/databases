var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err,results)=>{
        if(err){
          res.sendStatus(500)
        }
        // res.json(results)
        res.end(results.toString())
    })
  }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body.message)
      let params = {message: req.body.message, username: req.body.username, roomname: req.body.roomname};
      models.messages.post(params, (err)=>{
        if(err){
          res.sendStatus(500)
        } else {
        console.log('good job us')
        }
      })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err,results)=>{
        if(err){
          res.sendStatus(500)
        }
        // res.json(results)
        res.end(results.toString())
      })
    },
    post: function (req, res) {
      let params = {username: req.body.username}
      models.users.post(params, (err, results)=>{
        if(err){
          res.sendStatus(500)
        }
        res.sendStatus(201)
      })
    }
  },

  chatrooms: {
    get: function (req, res) {
      models.chat_rooms.get((err,results)=>{
        if(err){
          res.sendStatus(500)
        }
        // res.json(results)
      res.end(results.toString())
      })
    },
    post: function (req, res) {
      models.chat_rooms.post((err,results)=>{
        if(err){
          res.sendStatus(500)
        }
        res.sendStatus(201)
      })
    }
  }
};

