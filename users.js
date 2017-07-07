(function(){
    var app = angular.module('userlist-directives', []);

    app.directive("newUsers", function() {
      return {
        restrict:"A",
        templateUrl: "new-users.html"
      };
    });

    // app.directive("viewUserPost", function(){
    // 	return {
    // 		restrict: 'E';
    // 		templateUrl: "view-post.html",
    // 		controller: function(){
    // 			this.post = 1;
    // 			this.isSet = function(checkPost){
    // 				return $http.get
    // 			}
    // 		}
    // 	};
    // });

})();