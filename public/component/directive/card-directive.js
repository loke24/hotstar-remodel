(function(){
angular
	.module("hotstar")
	.directive("smallCard",function(){
		return{
			templateUrl:"component/directive/cardDirective.html",
			scope :{
				tray:"=tray"
			},
			controller :smallCard
		}
		function smallCard($scope,$state){
			// $scope.details = ["loke","reventh","logith","julie"];
			

			$scope.widthfunc = function($index,events){
				
				// if($index>=4){
					var n=$index-3;
					$('.'+$index)
						.css('position','absolute')
						.css('right',function(index){
							return index - 246  * n;
						});

				// }

				return $scope.aboveRight=true;

			}
			$scope.card_id = function(card){
				$state.go('card',{
					id:card._id
				})
			}

		}
	});
	
	
})();
