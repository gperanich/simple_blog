angular.module('SimpleBlog', ['ngRoute', 'ngResource', 'SimpleBlog.controllers', 'SimpleBlog.factories', 'SimpleBlog.services', 'SimpleBlog.directives'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeController'
    })
    .when('/compose', {
        templateUrl: 'views/newBlog.html',
        controller: 'NewBlogController'
    })
    .when('/users', {
        templateUrl: 'views/userList.html',
        controller: 'UserController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
    })
    .when('/:id/update', {
        templateUrl: 'views/updateBlog.html',
        controller: 'UpdateBlogController'
    })
    .when('/:id', {
        templateUrl: 'views/singleBlog.html',
        controller: 'SingleBlogController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);