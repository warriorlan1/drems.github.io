'use strict';

angular.module('myApp.addPost', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])

.controller('AddPostCtrl', ['$scope','$firebaseObject','$location','CommonProp','$q',function($scope,$firebaseObject,$location,CommonProp,$q) {
     
	if(!CommonProp.getUser()){
    $location.path('/home');
}
     var login={};
	$scope.login=login;

	$scope.logout = function(){
    CommonProp.logoutUser();
}

    $scope.AddPost = function(){
	login.loading = true;
	var title = $scope.article.title;
        var post = $scope.article.post;
	
	var fb = new Firebase("https://flickering-torch-9622.firebaseio.com/");
	
    	
        
	var user = CommonProp.getUser();
	
	$scope.submit = function() {
		console.log('is dumb');
	}
	console.log('your mom');
	
	fb.push({ title: title,post: post,emailId: user,'.priority': user})
	
		return $location.path('/welcome');
		login.loading = true;
		
    }
}]);

