angular.module('hang.auth', [])

	.controller('AuthController', function ($scope, $window, $location, $http, Auth, Users) {
		$scope.user = {};
		$scope.data;


		$scope.signin = function () {
			Auth.signin($scope.user)
				.then(function (token) {
					$window.localStorage.setItem('com.hang', token);
					console.log('signing in token: ', token)
					Users.saveUser(token);
					$location.path('/home');
				})
				.catch(function (error) {
					console.error(error);
				});
		};

		$scope.signup = function () {
			Auth.signup($scope.user)
				.then(function (token) {
					$window.localStorage.setItem('com.hang', token);
					Users.saveUser(token);
					$location.path('/home');
				})
				.catch(function (error) {
					console.error(error);
				});
		};
		
		$scope.signuplink = function () {
			$location.path('/signup')
		};

	});