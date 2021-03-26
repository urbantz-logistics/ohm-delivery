angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http, $window) {
            $scope.sendData = function() {
                $http.get(`http://localhost:3000/ohms/${this.trackingId}`)
                .then((result) => {
                    $scope.ohm = result.data.data;

                }, (error) => {
                    this.errorMessage = error.data.message;
                });
            };
            $scope.content = '/ohmDetails.html';
    });
    $scope.showButtons = function(){
        let history = $scope.ohm;
        let lastStatus = history[history.length - 1];
        if(!lastStatus) {
            return false
        }
        return lastStatus.state === 'IN_DELIVERY';
      };
    $scope.markAsDelivered = function() {
        $http.get(`http://localhost:3000//ohms/update-status/${this.trackingId}`, { para })
        .then((result) => {
           

        }, (error) => {
            console.log(error, typeof error)
            this.errorMessage = error.data.message;
        });
    };