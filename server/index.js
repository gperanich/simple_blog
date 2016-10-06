var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'simpleBlogUser',
    password: 'simpleBlogPass',
    database: 'SimpleBlog'
});

var app = express();
var clientPath = path.join(__dirname, '../client');
app.use(express.static(clientPath));
app.use(bodyParser.json());

app.route('/api/posts')
    .get(function(req, res) {
        var request = requestObj.getBlogs;
        blogRequest(request)
            .then(function(blogs) {
                res.send(blogs);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .post(function(req, res) {
        var request = requestObj.newBlog;
        request.params = [req.body.title, req.body.userid, req.body.categoryid, req.body.content];
        blogRequest(request)
            .then(function(blog) {
                res.status(201).send(blog);
            }, function(err) {
                res.status(500).send(err);
            });
    });

app.route('/api/posts/:id')
    .get(function(req, res) {
        var request = requestObj.getBlog;
        request.params = [req.params.id];
        blogRequest(request)
            .then(function(blog) {
                res.send(blog[0]);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .put(function(req, res) {
        var request = requestObj.updateBlog;
        request.params = [req.params.id, req.body.title, req.body.categoryid, req.body.content];
        blogRequest(request)
            .then(function(blog) {
                res.status(204).send(blog);
            }, function(err) {
                res.status(500).send(err);
            });
    })
    .delete(function(req, res) {
        var request = requestObj.deleteBlog;
        request.params = [req.params.id];
        blogRequest(request)
            .then(function(blog) {
                res.sendStatus(204);
            }, function(err) {
                res.status(500).send(err);
            });
    });

app.route('/api/users')
    .get(function(req, res) {
        var request = requestObj.getUsers;
        blogRequest(request)
            .then(function(users) {
                res.send(users);
            }, function(err) {
                res.status(500).send(err);
            });
    });

app.route('/api/categories')
    .get(function(req, res) {
        var request = requestObj.getCategories;
        blogRequest(request)
            .then(function(categories) {
                res.send(categories);
            }, function(err) {
                res.status(500).send(err);
            });
    });

app.get('*', function(req, res, next) {
    if (isAsset(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
});

app.listen(3000);

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0 ) { return false };
    var last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1) {
        return true;
    } else if (last.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}

var requestObj = {
    getBlogs: {
        query: 'CALL GetBlogs();'
    },
    getUsers: {
        query: 'CALL GetUsers();'
    },
    getCategories: {
        query: 'CALL GetCategories();'
    },
    getBlog: {
        query: 'CALL GetBlog(?);'
    },
    deleteBlog: {
        query: 'CALL DeleteBlog(?);'
    },
    newBlog: {
        query: 'CALL NewBlog(?,?,?,?);'
    },
    updateBlog: {
        query: 'CALL UpdateBlog(?,?,?,?)'
    }
};

function blogRequest(theRequest) {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(theRequest.query, theRequest.params, function(err, resultsets) {
                    if (err) {
                        connection.release();
                        reject(err);
                    } else {
                        connection.release();
                        resolve(resultsets[0]);
                    }
                });
            }
        });
    });
}
