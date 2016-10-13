var express = require('express');
var procedures = require('../procedures/posts.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

//Collection url for blog posts
router.route('/')
    .get(function(req, res) {
        procedures.all().then(function(posts) {
            res.send(posts);
        }, function(err) {
            res.status(500).send(err);
        });
    })
    .post(auth.isLoggedIn, function(req, res) {
        procedures.create(req.body.title, req.body.userid, req.body.categoryid, req.body.content).then(function(post) {
            res.send(post);
        }, function(err) {
            res.status(500).send(err);
        });
    });
//url for all /:id requests
router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id).then(function(post) {
            res.send(post);
        }, function(err) {
            res.status(500).send(err);
        });
    })
    .put(auth.isLoggedIn, function(req, res) {
        procedures.empty(req.params.id, req.body.title, req.body.categoryid, req.body.content).then(function() {
            res.sendStatus(204);
        }, function(err) {
            res.status(500).send(err);
        });
    })
    .delete(auth.isLoggedIn, auth.isAdmin, function(req, res) {
        procedures.destroy(req.params.id).then(function() {
            res.sendStatus(204);
        }, function(err) {
            res.status(500).send(err);
        });
    });

module.exports = router;