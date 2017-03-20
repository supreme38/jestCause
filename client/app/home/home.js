angular.module('hang.home', [])
	.controller('HomeController', function ($scope, Users, $mdPanel, $location, $mdDialog, $route, Auth, Events) {
		$scope.eventGuests = [];
		$scope.currentNavItem = "hang";
		$scope.getCurrentUser = Users.getCurrentUser;
		$scope.guests = $scope.eventGuests.toString();

		Users.getCurrentUser()
			.then(user => {
				$scope.user = user[0];
				Events.getEvents($scope.user)
				.then(events => {
					console.log('events! ', events)
					$scope.events = events;
					Events.getHostedEvents($scope.user)
					.then(hostedEvents => $scope.hostedEvents = hostedEvents);
				})
			});

		$scope.getGuests = function() {
			console.log('getting guests')
			$scope.guests = $scope.eventGuests.toString();
		}	

		$scope.createEventClick = function($event) {
			$scope.guests = $scope.eventGuests.toString();
			$scope.toEvent($event)
		}

		$scope.createEvent = function() {
			Events.postEvent({
				email: $scope.user.email,
				where: $scope.where,
				when: $scope.when,
				description: $scope.description,
				guests: $scope.guests
			})
			.then(resp => console.log('created!'))
		}

		$scope.toggleHang = function () {
			$scope.user.hang = !$scope.user.hang;
			console.log($scope.user.hang)
			Users.updateUser($scope.user)
				.then(resp => console.log('updated ', resp))
		}

		$scope.toHome = function() {
			$location.path('/home');
		}

		$scope.goTo = function(ev, info) {
		console.log(info);
		var confirm = $mdDialog.confirm()
			.title('Are you attending?')
			.targetEvent(ev)
			.ok('Yes')
			.cancel('No');
		}

		$scope.toEvent = function (ev) {
			$mdDialog.show({
					controller: 'HomeController',
					templateUrl: 'app/event/createEvent.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: $scope.customFullscreen
				});
		}

		$scope.eventList = function () {
			$location.path('/events');
		}

		$scope.changeUrl = function (ev) {
			var confirm = $mdDialog.prompt()
				.title('enter new profile picture url')
				.placeholder('url link')
				.ariaLabel('url link')
				.targetEvent(ev)
				.ok('Confirm')
				.cancel('Cancel');

			$mdDialog.show(confirm).then((result) => {
				Users.updateUser({
						email: $scope.user.email,
						profile_url: result
					})
					.then($route.reload())
			});
		}

		$scope.userEventAdd = function () {
			this.item.invited = this.item.invited === undefined ? true : !this.item.invited;
			if (this.item.invited) {
				$scope.eventGuests.push(this.item.email);
			} else {
				$scope.eventGuests.splice($scope.eventGuests.indexOf(this.item.email), 1)
			}
			console.log($scope.eventGuests);
		}

		$scope.signout = function () {
			Auth.signout();
		}

		Users.getUsers()
			.then(users => $scope.users = users);
	})



