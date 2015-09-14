app.controller('mainCtrl', ['$scope', '$rootScope', '$http', function($scope, $root, $http) {

    //Variables
        $scope.guesses = [];
        $scope.failures = 0;
        $scope.letters = [];

    //Functions
        $scope.input = function(letter) {
            $scope.guesses.push(letter);
            if($scope.word.indexOf(letter) === -1) {
                $scope.failures ++;
                if($scope.failures > 8) {
                    $scope.youLose();
                }
            } else {
                var done = true;
                $.each($scope.letters, function(i, letter) {
                    if(!letter.guessed()) {
                        done = false;
                        return false;
                    }
                });
                if(done) {
                    $scope.youWin();
                }
            }
        };
        $scope.newGame = function() {
            $scope.guesses = [];
            $scope.failures = 0;
            $scope.gameOver = false;
            $scope.getWord().then(function(response) {
                $scope.word = response.data.toLowerCase().substring(0, response.data.length-2);
                $scope.setLetters();
            });
        };
        $scope.setLetters = function() {
            $scope.letters = $scope.word.split('');
            $scope.letters = $scope.letters.map(function(val) {
                return {
                    digit: val,
                    guessed: function() {
                        return $scope.guesses.indexOf(val) !== -1;
                    }
                };
            });
        };
        $scope.youLose = function() {
            $scope.gameOver = 'You LOSE! The word was ' + $scope.word;
        };
        $scope.youWin = function() {
            $scope.gameOver = 'You WIN!!!';
        };
        $scope.getWord = function() {
            return $http.get('http://randomword.setgetgo.com/get.php');
        };

        function init() {
            console.log($scope);
            var functions = [
                $scope.newGame,
            ];
            $.each(functions, function(i, fn) {
                fn();
            });
        }

    init();

}]);
