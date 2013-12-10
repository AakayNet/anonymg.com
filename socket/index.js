var UserModel = require('../models/user.js');

module.exports = function (sockets) {
  return function (socket) {
    if (socket.handshake.session) {
      var _id = socket.handshake.session.passport.user;
      UserModel.find({_id: _id}, function (err, result) {
        var user = result[0];
        if (user) {
          var publicProfile = {
            _id: user._id,
            id: user.id,
            provider: user.provider,
            name: user.name,
            socketid: socket.id,
            online: true
          };
          UserModel.update(publicProfile, function (err, result) {
            socket.emit('self', user);
          });
          socket.on('disconnect', function (data) {
            publicProfile.socketid = null;
            publicProfile.online = false;
            UserModel.update(publicProfile, function (err, result) {
            });
          });
          socket.on('self', function (data) {
            socket.emit('self', user);
          });
        }
      });
    } else {
      socket.emit('self', {});
    }
  };
};
