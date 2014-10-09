rumBukkaApp.controller('userProfileController', function($scope, $route, $routeParams, $location, userData, $window, $rootScope, organisationData, bookingData) {

	$scope.userTypes = ["Hons", "Masters", "PHD", "Faculty"];

	userData.getUser($routeParams.userId).$promise.then(function(user) {
		console.log("Have user");
		$scope.currentProfile = user;
		getOrg();
		//getType();

	});

	$scope.bookings = [];

	$scope.loadBookings = function(){

		bookingData.getBookings().$promise.then(function(bookings) {
			$scope.bookings = bookings;
		});	

	}

	$scope.loadBookings();

	function getOrg() {
		orgs = organisationData.getOrganisations().$promise.then(function(orgs) {
			console.log(orgs);
			for (var i = orgs.length - 1; i >= 0; i--) {
				if (orgs[i].Organisation_Id == $scope.currentProfile.Organisation_Id) {
					console.log("Foujnd him captain");
				}

			};
			$scope.userOrg = "Pants";
		});

	}

	$scope.modifyBooking = function(booking) {
		$location.url("/modifyBooking/" + booking.Booking_Id);
	}

	$scope.deleteBooking = function(booking) {
		
		var ok = confirm("Are you sure you want to delete booking " + booking.Booking_Id);

		if(ok == false) return;

		bookingData.deleteBooking(booking.Booking_Id).$promise.then(function(){
			$scope.loadBookings();
		});
	}

	$scope.editUser = function(){
		$location.url("/addPerson/name/userid/" + $scope.currentProfile.User_Id)
	}

	// if($routeParams.userId != null) {
	// // console.log("Getting User");
	// // userData.getUser($routeParams.userId).$promise.then(function(user) {
	// //     $scope.currentProfile = user;
	// //     });
	// });
	// $scope.userTypes = ["Hons", "Masters", "PHD", "Faculty"];;

	// organisationData.getOrganisations().$promise.then(function(orgs) {

	// 	$scope.orgs = orgs;;

	// 	if ($routeParams.userid != null) {
	// 		console.log("Setting user");
	// 		bookingData.getBookings
	// 		userData.getUser($routeParams.userid).$promise.then(function(user) {
	// 			$scope.user = user;
	// 			//$scope.user.O  ganisation = $scope.user.Organisation.OrganisationName;
	// 			$scope.user.Type = $scope.userTypes[$scope.user.Type];
	// 		})

	// 	} else if ($routeParams.userName != null) {
	// 		$scope.user = {};
	// 		$scope.user.FirstName = $scope.getName(0);
	// 		$scope.user.LastName = $scope.getName(1);
	// 	}


	// });

	// $scope.getName = function(index) {
	// 	var name = $routeParams.userName;
	// 	return name.split(' ')[index];
	// }

	// //submit function
	// $scope.submit = function() {
	// 	//console.log("Organisation_Id: " + $scope.user.Organisation.Organisation_Id);

	// 	if (typeof $scope.user.Organisation === 'undefined') {
	// 	  var error = getError(-2);
	// 	  if(error != null) {
	// 	    alert(error);
	// 	    return;
	// 	}
	// 	}
	//   	if (typeof $scope.user.Type === 'undefined') {
	// 	  var error = getError(-3);
	// 	  if(error != null) {
	// 	    alert(error);
	// 	    return;
	// 	}
	// 	}
	// 	if(typeof $scope.user.VUWId === 'undefined'){
	// 	  var error = getError(-4);
	// 	  if(error != null) {
	// 	    alert(error);
	// 	    return;
	// 	}
	// 	}

	// 	$scope.user.Type = $scope.userTypes.indexOf($scope.user.Type)
	// 	userData.addUser($scope.user).$promise.then(function(user) {	  
	// 	  var error = getError(user.VUWId);
	// 	  if(error != null) {
	// 	    alert(error);
	// 	    return;
	// 	}

	// 		console.log(user + " " + user.User_Id);
	// 		$location.url("addBooking/" + user.User_Id)
	// 	});
	// }
	// $scope.cancel = function() {
	// 	$location.url('/');
	// }
	// $scope.reversed = false;

	// $scope.reverse = function() {
	// 	if (!$scope.reversed && $scope.user.LastName == '') {
	// 		$scope.user.LastName = $scope.user.FirstName;
	// 		$scope.user.FirstName = "";
	// 		$scope.reversed = true;
	// 	}

	// }


});