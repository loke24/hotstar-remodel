angular
	.module('hotstar')
	.directive('cardPackage',function(){
		return{
			restrict:"EA",
			templateUrl : "component/directive/card-package.html",
			controller :maincard,
			scope:{
				newdetails:'='
			}
		}
		function maincard($scope,$http,$state,$mdDialog,$stateParams){
			$scope.$watch('',function(){
				$('.arrow-left').css("opacity","0");
			})

			$scope.contentEdit = function(tray,event){
				console.log("lokfodk");
				$state.go('contentEdit',{
					id:tray._id,
					content:tray.content
				})

						$mdDialog.show({
							templateUrl:'component/controller/dialog.html',
							parent:angular.element(document.body),
							controller:addCard,
							targetEvent:event,
							clickOutsideToClose:true,
							fullscreen:$scope.fullscreen

						});
					}
			
			function addCard($scope,$http){
									$scope.addnewCard = function(){
								// $scope.card_content = {};
								// $scope.test ="new";
								var formdata = new FormData;
								for(key in $scope.card_content){
									formdata.append(key,$scope.card_content[key]);
								}
								console.log("lokfodk");
								// var title = $('#title').val();
								// var tag = $('#tag').val();
								var file = $('#file')[0].files[0];
								
								console.log('dld'+$scope.ttt);
								// formdata.append('title',title);
								formdata.append('image',file);
								// formdata.append('tag',tag);
								console.log(formdata);
							 $http.post('/contentEdit/'+$stateParams.content,formdata,{
							 	transformRequest:angular.identity,
							 	headers:{
							 		'content-type':undefined
							 	}
							 })
								.then(function(data){
									console.log(data);
									$scope.card_content='';
								},function(error){
									console.log(error);
								});

						}
						// $scope.addnewCard = function(){
						// 	console.log("lokessss")
						// 	$http.post('/newcard',$scope.card_content).then(function(data){
						// 		console.log(data);
						// 		$scope.card_content='';
						// 	})
						// }			
		}
	}
	})
	.directive('arrowLeft',function(){
		return{
			restrict:'A',
			//replace:true,
			link:function(scope,element){
				element.bind('click',function(event){
					//var eleme=parseInt(document.getElementById('card-panel').style.left);
					// document.getElementById('card-panel').style.left = (eleme + 246) +"px";
					
					//var value='246'+elem;
					//elem.setAttribute('style','left:+=246');
				
					//eleme.style.left=value;
					
					$(event.target).closest('#title').find('#card-panel').animate({
								left:'+=246',
							transition:'all 1s'
						});

					});
				element.bind('mouseover',function(){
					element.css('cursor','pointer');
				});
				
			}
		}
	})
	.directive('arrowRight',function(){
		return{
			restrict:'EA',
			replace:true,
			link:function(scope,element){
				element.bind('click',function(){
					$(event.target).closest('#title').find('#card-panel').animate({
								left:'-=246',
							transition:'all 1s'
						});
					scope.hidden=true;
					});
				element.bind('mouseover',function(){
					element.css('cursor','pointer');
				});
				
			}
		}
	});
