// public/core.js
var carsManager = angular.module('carsManager', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all cars and show them
    $http.get('/car/')
        .success(function(data) {
            $scope.cars = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createCar = function() {
        $http.post('/car/', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
				
				$http.get('/car/')
					.success(function(data) {
						$scope.cars = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
				
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a car after checking it
    $scope.deleteCar = function(id) {
        $http.delete('/car/' + id)
            .success(function(data) {				
				$http.get('/car/')
					.success(function(data) {
						$scope.cars = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // update a car
    $scope.updateCar = function() {
        $http.put('/car/' + $scope.formDataUpdate.id, $scope.formDataUpdate)
            .success(function(data) {
                $scope.formDataUpdate = {}; // clear the form so our user is ready to enter another
				
				$http.get('/car/')
					.success(function(data) {
						$scope.cars = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
				
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}