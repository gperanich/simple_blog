angular.module('SimpleBlog.services', [])
.service('UserService', ['$http', '$location', function($http, $location) {
    var user;
    this.isLoggedIn = function() {
        if (user) {
            return true;
        } else {
            return false;
        }
    }
    this.requireLogin = function() {
        if (!this.isLoggedIn()) {
            var current = $location.path();
            $location.path('/login').search('p', current);
        }
    }
    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: 'http://localhost:3000/api/users/login',
            data: { email, password }
        }).then(function(success) {
            user = success.data;
            return success.data;
        });
    }
    this.logout = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/users/logout'
        }).then(function(success) {
            user = undefined;
        });
    }
    this.me = function() {
        if (user) {
            return Promise.resolve(user);
        } else {
            return $http({
                url: 'http://localhost:3000/api/users/me'
            }).then(function(success) {
                user = success.data;
                return success.data;
            });
        }
    }
}])