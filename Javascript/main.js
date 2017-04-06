var app = angular.module('mainWindow',[]);

app.controller('sendMailController',[function($scope,$element){
	this.composeMailFlag = false;
	this.initiateComposeMail = function(){
		console.log(element);
		this.composeMailFlag = true;	
	}
}]);
