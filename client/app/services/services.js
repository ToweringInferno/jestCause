angular.module('hang.services', [])

	.factory('Auth', function ($http, $location, $window) {
		var signin = function (user) {
			return $http({
					method: 'POST',
					url: '/api/users/signin',
					data: user
				})
				.then(function (resp) {
					return resp.data.token;
				});
		};

		var signup = function (user) {
			return $http({
					method: 'POST',
					url: '/api/users/signup',
					data: user
				})
				.then(function (resp) {
					return resp.data.token;
				});
		};

		var isAuth = function () {
			return !!$window.localStorage.getItem('com.hang');
		};

		var signout = function () {
			$window.localStorage.removeItem('com.hang');
			$location.path('/signin');
		};


		return {
			signin: signin,
			signup: signup,
			isAuth: isAuth,
			signout: signout
		};
	})

	.factory('Users', function($http, $location, $window) {
		var currentUser;

		var getUsers = function() {
			console.log('getting called')
			return $http({
				method: 'GET',
				url: '/api/users/'
			})
			.then(function(resp) {
				return resp.data;
			});
		};

		var updateUser = function(user) {
			return $http({
				method: 'PUT',
				url: '/api/users/',
				data: user
			})
			.then(function(resp) {
				console.log(resp, 'from updateUser');
				return resp.data
			});
		};

		var saveUser = function(user) {
			currentUser = user;
		};

		var getCurrentUser = function() {
			console.log('getcurrentuser getting called')
			return $http({
				method: 'GET',
				url: '/api/currentUser',
			})
			.then(user => user.data);
		}

		return {
			getUsers,
			updateUser,
			saveUser,
			getCurrentUser
		}
	})



