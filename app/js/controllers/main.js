app.controller('mainCtrl', ['$scope', '$rootScope', function($scope, $root) {

    //Variables
        $scope.word = 'bittitan';
        $scope.guesses = [];
        $scope.failures = 0;

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
            $scope.failures = '';
            $scope.gameOver = false;
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
            $scope.gameOver = 'You LOSE!';
        };
        $scope.youWin = function() {
            $scope.gameOver = 'You WIN!!!';
        };

        function init() {
            console.log($scope);
            var functions = [
                $scope.setLetters
            ];
            $.each(functions, function(i, fn) {
                fn();
            });
        }

    init();

}]);
