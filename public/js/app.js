angular.module('hotstar',['ngMaterial','ui.router'])
		.config(function($stateProvider){
			$stateProvider
				.state('admin',{
					url:'/admin',
					templateUrl:'component/directive/register.html'
				})
				.state('card',{
					url:'/card/:id',

				})
				.state('contentEdit',{
					url:'/contentEdit/:content'

				})
		})

