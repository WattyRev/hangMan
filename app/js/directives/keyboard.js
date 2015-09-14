app.directive('keyboardDir', function() {

    function link($scope, $elem, $attrs) {
        $scope.keys = [
            ['q','w','e','r','t','y','u','i','o','p'],
            ['a','s','d','f','g','h','j','k','l'],
            ['z','x','c','v','b','n','m']
        ];
        $scope.isDisabled = function(key) {
            if($scope.disabled.indexOf(key) === -1) {
                return false;
            }
            return true;
        };
    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: 'html/directives/keyboard.html',
        scope: {
            input: '=click',
            disabled: '=?disabledKeys'
        }
    };

});
