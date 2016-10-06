angular.module('SimpleBlog.factories', ['ngResource'])
.factory('Posts', ['$resource', function($resource) {
    var p = $resource('http://localhost:3000/api/posts/:id', { id: '@id' }, {
        update: { method: 'PUT' }
    });
    return p;
}])
.factory('Users', ['$resource', function($resource) {
    var u = $resource('http://localhost:3000/api/users');
    return u;
}])
.factory('Categories', ['$resource', function($resource) {
    var c = $resource('http://localhost:3000/api/categories');
    return c;
}]);