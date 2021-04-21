angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        // request the data from the selected Ohm
        $scope.requestOhm = function() {
            // reset the table that displays the data and the error message
            this.trackingElement = null;
            this.errorDisplay = null;
            // get the data
            $http.get(`/ohms/${this.trackingId}`)
            .then((value) => {
                if(value.data){
                    this.trackingElement = value.data;
                    console.log(this.trackingElement);
                }
                else{
                    this.errorDisplay = 'There are no Ohms with that ID 😥';
                }
            }, (error) => {
                this.errorDisplay = `The conexion returned an error`;
            });
        };
        // update the data from the selected Ohm
        $scope.updateOhm = function() {
            // post the data
        };
    });