(function(){
	var app = angular.module('userDetail', ['userlist-directives', 'ui.router']);

	app.controller('userController', ['$scope', '$http', '$window', '$state', function($scope, $http, $window, $state){
		// $scope.createUser = function(){
		// 	$window.location.href="new-users.html";
		// };

		var userlist = this;
		userlist.users = [];
		$http.get('http://jsonplaceholder.typicode.com/users').success(function(data){
			userlist.users = data;
		});

		// $scope.createUser = function(){
		// 	console.log('Should navigate now');
		// 	$state.go('newusers');
		// }
	}]);

	app.controller('newUserController', ['$http','$scope', function($http, $scope)  {
		$scope.user = {};
		$scope.createNewUser = function(){	
			$http.post('http://jsonplaceholder.typicode.com/users', JSON.stringify($scope.user)).then(function(status){
				if(status){
					$scope.msg = "New User Created";
					console.log(status);
				}
				else{
				 	$scope.err = "New User NOT Created";
				 	console.log("Error Message");
				 }
			});
		};
	}]);

	app.controller('AlbumController', function($scope, $http, $stateParams){
		var url = "http://jsonplaceholder.typicode.com/users/" + $stateParams.userId + "/albums" ;
		$http.get(url).then(function(response){
			$scope.albums = response.data;
		});
	});

	app.controller('viewPostController', function($scope, $http, $stateParams){
		var url = "http://jsonplaceholder.typicode.com/users/" + $stateParams.userId + "/posts";
		console.log(url);
		$http.get(url).then(function(response){
			$scope.posts = response.data;
			console.log($scope.posts);
		});
	});
	
	app.controller('viewCommentController', function($scope, $http, $stateParams){
		var url = "http://jsonplaceholder.typicode.com/posts/" + $stateParams.postId + "/comments";
		console.log(url);
		$http.get(url).then(function(response){
			$scope.comments = response.data;
			console.log($scope.comments);
		});
	});

	app.controller('viewPhotosController', function($scope, $http, $stateParams){
	var url = "http://jsonplaceholder.typicode.com/albums/" + $stateParams.albumId + "/photos";
	console.log(url);
	$http.get(url).then(function(response){
			$scope.photos = response.data;
			console.log($scope.photos);
		});
	});

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'home.html'
			})
			.state('newusers', {
				url: '/newusers',
				templateUrl: 'new-users.html',
				controller: 'newUserController'
			})
			.state('viewposts', {
				url: '/viewposts/:userId',
				templateUrl: 'view-post.html',
				controller: 'viewPostController'
			})
			.state('viewuseralbum', {
				url: '/viewuseralbum/:userId',
				templateUrl: 'view-album.html',
				controller: 'AlbumController'
			})
			.state('viewpostcomment', {
				url: '/viewpostcomment/:postId',
				templateUrl: 'view-comment.html',
				controller: 'viewCommentController'
			})
			.state('viewphotos', {
				url: '/viewphotos/:albumId',
				templateUrl: 'view-photos.html',
				controller: 'viewPhotosController'
			})
	});

})();