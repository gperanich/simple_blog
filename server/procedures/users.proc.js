var db = require('../config/db');

exports.all = function() {
    return db.rows('GetUsers');
}
exports.readByEmail = function(email) {
    return db.row('GetUserByEmail', [email]);
}
exports.read = function(id) {
    return db.row('GetUser', [id]);
}
exports.create = function(firstname, lastname, email, password) {
    return db.row('NewUser', [firstname, lastname, email, password]);
}
exports.destroy = function(id) {
    return db.empty('DeleteUser', [id]);
}