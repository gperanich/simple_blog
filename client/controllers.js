angular.module('SimpleBlog.controllers', [])
.controller('WelcomeController', ['$scope', '$location', 'Posts', 'Users', 'Categories', function($scope, $location, Posts, Users, Categories) {
    $scope.blogs = Posts.query();
    $scope.users = Users.query();
    $scope.categories = Categories.query();

    console.log($scope.blogs);

    $scope.newBlog = function() {
        $location.url('/compose');
    };
}])

.controller('NewBlogController', ['$scope', '$routeParams', '$location', 'Posts', 'Users', 'Categories', function($scope, $routeParams, $location, Posts, Users, Categories) {
    $scope.users = Users.query();
    $scope.categories = Categories.query();

    $scope.postBlog = function() {
        var postData = {
            title: $scope.title,
            userid: $scope.selectedUser,
            categoryid: $scope.selectedCategory,
            content: $scope.newBlogContent
        }
        var post = new Posts(postData);
        post.$save();

        $location.url('/');
        $scope.blogs = Posts.query();        
    }
}])

.controller('UpdateBlogController', ['$scope', '$routeParams', '$location', 'Posts', 'Users', 'Categories', function($scope, $routeParams, $location, Posts, Users, Categories) {
    $scope.singleBlog = Posts.get({ id: $routeParams.id });
    $scope.categories = Categories.query();

    $scope.updateBlog = function() {
        $scope.singleBlog.$update();

        $location.url('/' + $routeParams.id);
    }
}])

.controller('SingleBlogController', ['$scope', '$routeParams', '$location', 'Posts', 'Users', 'Categories', function($scope, $routeParams, $location, Posts, Users, Categories) {
    $scope.singleBlog = Posts.get({ id: $routeParams.id });
    console.log($scope.singleBlog);

    $scope.editBlog = function() {
        $location.url('/' + $routeParams.id + '/update');
    }

    $scope.deleteBlog = function() {
        var confirmDelete = confirm('Are you sure you want to delete this blog?');
        if (confirmDelete) {
            $scope.singleBlog.$delete();

            $location.url('/');
            $scope.blogs = Posts.query();
        }
    }
}]);