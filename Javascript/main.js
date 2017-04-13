var app = angular.module('mainWindow',[]);

app.controller('mainWindowController',function(){
	this.composeMailFlag = false;
	this.inboxFlag = false;

	this.toggleComposeMail = function(){
		this.composeMailFlag = !this.composeMailFlag;
		if(this.inboxFlag == true) this.inboxFlag = false;
	}
	this.toggleInbox = function(){
		this.inboxFlag = !this.inboxFlag;
		if(this.composeMailFlag == true) this.composeMailFlag = false;
		if(this.inboxFlag == true){
			var inbox = document.getElementsByClassName('rightCorner')[0];
			console.log(window.innerHeight);
			inbox.style.height = window.innerHeight - 35 + 'px';
		}
	}
});
app.controller('sendMailController',function(){
	
});
app.controller('inboxController',function($scope,mailInboxService){
	$scope.oddMail = [],$scope.evenMail=[];
	$scope.mail = mailInboxService.getFullMail();
	for(i = 0;i < $scope.mail.length;i+=2){
		$scope.oddMail.push($scope.mail[i]);
		if(i+1<$scope.mail.length) $scope.evenMail.push($scope.mail[i+1]);
	}
	
	this.openMail = function(obj,mailObject){
		if(!obj.currentTarget.classList.contains('active')){ 
			obj.currentTarget.classList.add('active');
			if(mailObject.checked !='checked-true'){
				this.markMailRead(mailObject);
			}
		}
		else obj.currentTarget.classList.remove('active');
	}

	this.markMailRead = function(mailObject){
		for(i=0;i<$scope.mail.length;i++){
			if($scope.mail[i] == mailObject){
				mailInboxService.setMailRead(mailObject.$$hashKey);
			}
		}

	}
});


app.service('mailInboxService',function(){
	var mail = [
			{'sender':'ashik.unni.00@gmail.com','subject':'A Thank You Note','message':'Hi\n\nThank you for this Opportunity\nRegards\n\nAshik Unni A\nCreator of this concept','checked':'checked-false'},
			{'sender':'hacker@valtanix.net','subject':'Just an Enquiry','message':'Hi,\n\nSad to hear about your health!. Hope, you recovered from it;\n\nWe are very much interested in your profile; So, please do continue working on the inbox and get back to us;If you are able to complete inbox this week, we would like to meet you in person sometime next week in Chennai;\n\nI will give you a call later this week;\n\nHave a great evening!\n\nRegards,\nAnand','checked':'checked-true'},
			{'sender':'hacker@valtanix.net','subject':'Work in Progress, Guys!','message':'Ashik,\n\nPlease do commit the code in the github and share the link;\n\nThanks,\nAnand','checked':'checked-true'},
			{'sender':'ashik.unni.00@gmail.com','subject':'A Thank You Note','message':'Hi\n\nThank you for this Opportunity\nRegards\n\nAshik Unni A\nCreator of this concept','checked':'checked-false'},
			{'sender':'hacker@valtanix.net','subject':'Just an Enquiry','message':'Hi,\n\nSad to hear about your health!. Hope, you recovered from it;\n\nWe are very much interested in your profile; So, please do continue working on the inbox and get back to us;If you are able to complete inbox this week, we would like to meet you in person sometime next week in Chennai;\n\nI will give you a call later this week;\n\nHave a great evening!\n\nRegards,\nAnand','checked':'checked-true'},
			{'sender':'hacker@valtanix.net','subject':'Work in Progress, Guys!','message':'Ashik,\n\nPlease do commit the code in the github and share the link;\n\nThanks,\nAnand','checked':'checked-true'}
			
		];
	return{
		getFullMail : getFullMail,
		setMailRead : setMailRead
	}
	function getFullMail(){
		return mail;
	}
	function setMailRead(hashkey){
		for(i=0;i<mail.length;i++){
			if(mail[i].$$hashKey == hashkey){
				mail[i].checked = 'checked-true';
			}
		}
	}
});

app.directive('subjectFilled',function(){
	return {
		require: 'ngModel',
		link: function(scope,element,attr,mControl){
			function subjectValidation(innerHTML){
				if(innerHTML == ''){
					mControl.$setValidity('subjectNotEmpty',false);
				}
				else{
					mControl.$setValidity('subjectNotEmpty',true);	
				}
				return innerHTML;
			}
			mControl.$parsers.push(subjectValidation);
		}
	};
});