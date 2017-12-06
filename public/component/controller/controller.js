(function(){

	'use strict';
	angular
		.module('hotstar')
		.controller('maincontrol',function($scope,$http,$timeout,$mdDialog,$q){
					
					$scope.$on('inserted',function(event,value){
						$scope.refresh = value;
						console.log("loo");
					})


					$scope.fullscreen = false;
						$scope.$watch('refresh',function(value){
						if(value===true){
							console.log(value);
							console.log("ldlslpdlp");

						}
					});
						$http.get('/newDetailget').then(function(data)
								{
												
								$scope.newdetails= data.data;
								console.log($scope.newdetails);
							})

						//$scope.test = "lll";
						$scope.testing = function(){
							$http.post('/testing/:test').then(function(){
								console.log("success");
							})
						}
					$scope.submit = function(){
						// $http.post('/regis',$scope.register).then(function(success){
						// 	console.log(success);
						// 	$scope.register ='';
						// })
						console.log('clcik');
						$scope.refresh = true;
					}

					$scope.addCard = function(event){
						$mdDialog.show({
							template:'<div style="padding:20px;height: 150px;">'+
									'<md-input-container class="md-block" flex-gt-sm>'+
									'<label>title</label>'+
									'<input id="title" ng-model="card_content.content" type="text">'+
									'</md-input-container>'+
									'<button style="margin-left:64px" class="btn btn-warn" ng-click="addRowcontent()">submit</button>'+
									'</div>',
							parent:angular.element(document.body),
							controller:addCard,
							targetEvent:event,
							clickOutsideToClose:true,
							fullscreen:$scope.fullscreen

						});
					}
					function addCard($scope,$http){
					//
						$scope.addRowcontent =function()
						{
							$http.post('/newcontent',$scope.card_content).then(function(data){
								$scope.refresh=true;
								console.log(data);
								$scope.card_content = '';
								$scope.$emit('inserted',$scope.refresh);
	
							})
						}
						
						
						

					}
					


					

					

		});

		


})();