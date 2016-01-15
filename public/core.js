// public/core.js
var coffiene = angular.module('coffiene', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all brew and show them
    $http.get('/api/brews')
        .success(function(data) {
            $scope.brews = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createBrew = function() {
        $http.post('/api/brews', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.brews = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteBrew = function(id) {
        $http.delete('/api/brews/' + id)
            .success(function(data) {
                $scope.brews = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
