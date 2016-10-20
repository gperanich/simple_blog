angular.module('SimpleBlog.factories', ['ngResource'])
.factory('Posts', ['$resource', function($resource) {
    var p = $resource('/api/posts/:id', { id: '@id' }, {
        update: { method: 'PUT' }
    });
    return p;
}])
.factory('Users', ['$resource', function($resource) {
    var u = $resource('/api/users/:id', { id: '@id' });
    return u;
}])
.factory('Categories', ['$resource', function($resource) {
    var c = $resource('/api/categories');
    return c;
}])
.factory('Email', ['$resource', function($resource) {
    var e = $resource('api/contact/:id', { id: '@id'});
    return e;
}]);