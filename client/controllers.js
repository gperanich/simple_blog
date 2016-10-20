angular.module('SimpleBlog.controllers', [])
.controller('WelcomeController', ['$scope', '$location', 'Posts', 'Users', 'Categories', 'SEOService', function($scope, $location, Posts, Users, Categories, SEOService) {
    $scope.blogs = Posts.query();
    $scope.users = Users.query();
    $scope.categories = Categories.query();

    console.log($scope.blogs);

    $scope.newBlog = function() {
        $location.url('/compose');
    };

    SEOService.setSEO({
        title: 'Simple Blog | Home',
        description: 'This is a blogging site. Blog on.',
        image: 'http://' + $location.host() + '/images/pizza.png',
        url: $location.absUrl()
    });
}])

.controller('NewBlogController', ['$scope', '$routeParams', '$location', 'Posts', 'Users', 'Categories', 'UserService', function($scope, $routeParams, $location, Posts, Users, Categories, UserService) {
    UserService.requireLogin();
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
}])

.controller('UserController', ['$scope', 'Users', 'UserService', '$location', function($scope, Users, UserService, $location) {
    UserService.requireLogin();
    $scope.users = Users.query();

    $scope.logout = function() {
        UserService.logout().then(function(success) {
            $location.url('/');
        });
    }

    $scope.newUser = function() {
        var userData = {
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            email: $scope.email,
            password: $scope.password
        }
        var user = new Users(userData);
        user.$save(function(success) {
            console.log('added user');

            $location.url('/users');
            $scope.users = Users.query();
            $scope.firstname = '';
            $scope.lastname = '';
            $scope.email = '';
            $scope.password = '';
            $scope.confirmPassword = '';
        });
    }

    $scope.deleteUser = function(user) {
        var confirmDelete = confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            console.log('deleting user');
            user.$delete();

            $location.url('/users');
            $scope.users = Users.query();
        }
    }

}])

.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    UserService.me().then(function(success) {
        redirect();
    });
    function redirect() {
        var dest = $location.search().p;
        if (!dest) {
            dest ='/'
        }
        $location.path(dest).search('p', null).replace();
    }
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err);
        });
    }
}])

.controller('SingleUserController', ['$scope', '$location', 'Users', '$routeParams', function($scope, $location, Users, $routeParams) {
    $scope.singleUser = Users.get({ id: $routeParams.id })
    
    $scope.deleteUser = function() {
        var confirmDelete = confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            $scope.singleUser.$delete();

            $location.url('/users');
            Users.query();
        }
    }
}])

.controller('ContactController', ['$scope', '$location', 'Email', function($scope, $location, Email) {
    $scope.sendContactEmail = function () {
        var emailData = {
            toAddress: 'gperanich@gmail.com',
            fromAddress: $scope.contactEmail,
            subject: $scope.contactSubject,
            emailBody: $scope.newContactEmail
        }
        var email = new Email(emailData);
        email.$save();

        $location.url('/')
    }
}])