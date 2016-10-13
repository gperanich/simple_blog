var db = require('../config/db');

exports.all = function() {
    return db.rows('GetBlogs');
}
exports.read = function(id) {
    return db.row('GetBlog', [id]);
}
exports.create = function(title, userid, categoryid, content) {
    return db.row('NewBlog', [title, userid, categoryid, content]);
}
exports.update = function(id, title, categoryid, content) {
    return db.empty('UpdateBlog', [id, title, categoryid, content]);
}
exports.destroy = function(id) {
    return db.empty('DeleteBlog', [id]);
}