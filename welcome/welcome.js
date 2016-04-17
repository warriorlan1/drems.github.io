'use strict';

angular.module('myApp.welcome', ['ngRoute','firebase'])

.config(['$routeProvider', '$sceDelegateProvider','$sceProvider', function($routeProvider,$sceDelegateProvider,$sceProvider) {
   $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self'
  ]);
}])



.controller('WelcomeCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$location', 'CommonProp', '$sce', '$sceDelegate', function($scope, $firebaseObject, $firebaseArray, $location ,CommonProp, $sce, $sceDelegate) {
    $scope.username = CommonProp.getUser();

   // $scope.username = CommonProp.getUser();
 
    if(!$scope.username){
        $location.path('/home');
    }

    var fb = new Firebase("https://flickering-torch-9622.firebaseio.com/");
	var ref = $firebaseObject(fb);
	var arr = $firebaseArray(fb);
	
	$scope.fixThisShit = function(id) {
		fb.on("value",function(snapshot) {
			var newPost = snapshot.val();
			var log = [];			///test to get the image to display
			angular.forEach(newPost, function(value, key) {
			this.push(key + ': ' + value);
			}, log);
			var poop = log[id].split(':');
			var poopie = (newPost[poop[0]].MOI);
			/*var butt = $sceDelegate.trustAs($sce.Js.poopie);
			
			$scope.fuck = function(butt) {
				return  butt;
			}*/
		})
	}
	
	$scope.showBody = function(baby) {
		fb.on("value",function(snapshot) {
			var newPost = snapshot.val();
			var log = [];			///test to get the image to display
			angular.forEach(newPost, function(value, key) {
			this.push(key + ': ' + value);
			}, log);
			console.log(baby);
			var poop = log[baby].split(':');
			$scope.bodyImageFront = newPost[poop[0]].Image_Front;
			$scope.bodyImageBack = newPost[poop[0]].Image_Back;
		})
	}
	
	fb.on("value",function(snapshot) {
	  var newPost = snapshot.val();
	  $scope.articles = newPost;
	  var log = [];									///test to get the image to display
		angular.forEach(newPost, function(value, key) {
		this.push(key + ': ' + value);
		}, log);
		/*var poop = log[0].split(':');
		var boob = snapshot.child(poop[0]);
		var lemon = boob.child('MOI').val();
		var decode = atob(lemon);*/
		
	});
	
	
    /*var sync = fb.startAt($scope.username).endAt($scope.username);
	var poop = $firebaseArray(fb)
    $scope.articles = sync;
	console.log(sync);*/
	
	

	$scope.logout = function(){
    CommonProp.logoutUser();
}
	
	$scope.hiddenDiv = false;
	
	$scope.viewBody = function() {
		 $('#bodyModal').modal();
	}

    $scope.confirmDelete = function(id) {
        var article = new Firebase("https://flickering-torch-9622.firebaseio.com/");
        /$scope.postToDelete = article.$asObject();/
        $('#deleteModal').modal();
		$scope.baby = id;
		console.log($scope.baby);
		
    }
	
	$scope.baby = null;
    $scope.deletePost = function() {
        var article = new Firebase("https://flickering-torch-9622.firebaseio.com/");
		fb.on("value",function(snapshot) {
	    var newPost = snapshot.val();
		var log = [];
		angular.forEach(newPost, function(value, key) {
		this.push(key + ': ' + value);
		}, log);
		var poop = log[$scope.baby].split(':');
		console.log(poop[0]);
		var deleteMe = new Firebase("https://flickering-torch-9622.firebaseio.com/" + poop[0]);
		deleteMe.on("value",function(snapshot) {
			var thisThing = snapshot.val();
			console.log(thisThing);
			console.log[log];
			if ($scope.baby != null) {
			/*deleteMe.remove()*/
			}
			else {}
		});
      
        return $('#deleteModal').modal('hide');
		})
	}




}]);
