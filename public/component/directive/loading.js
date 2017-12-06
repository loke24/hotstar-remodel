angular
	.module('hotstar')
	.directive('ngLoading',function ($compile,$templateRequest) {

		return{
			restrict:'A',
			link:function(scope,element,attrs){
				
				var elem = element.html();
				scope.$watch(attrs.ngLoading,function(val){
					if(val){
						element.html(elem);
						console.log("1");
						$compile(element.contents())(scope);
					}
					else{
						$templateRequest('component/directive/loading.html').then(function(web){
							var temp = angular.element(web);
							console.log("2");
							element.html(temp);
							$compile(temp)(scope);
						})
					}
				})
			}
		}
	});