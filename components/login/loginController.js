/*jshint esversion: 6 */
$(document).ready(function(){
	window.lognObj = new loginController();
	lognObj.init();
})

var loginController = function(){
	var self = this;

	this.init = function(){
			$("#password").on("blur", this.validateUser);
			$("#password").on("keypress", this.keyupEventHandler);
	};

	this.validateUser = function(){
		var userName = $("#username").val();
		var password = $("#password").val();
		var params = {
			username: userName
		};
		$.ajax({
			type: 'GET',
			data: params,
			contentType: 'application/json',
			url: '/fetchRegisteredUserData',
			success: function (data) {
				$( "#login" ).removeClass("shake");
				if($.isArray(data)){
					var storedPassword = data[0].password;
					if(storedPassword===password){
						self.navigateToHomePage();
						return;
					}else{
						self.loginFailHandler();
					}
				}else{
					self.loginFailHandler();
				}

			},
			error: function(error){
				console.log(error);
				$( "#login" ).removeClass("shake");
				self.loginFailHandler();
			}
		});
	};

	this.navigateToHomePage = function(){
		$(location).attr("href", "http://localhost:3000/home");
	};

	this.loginFailHandler = function(){
		setTimeout(function(){	$( "#login" ).addClass("shake");},200);
	};

	this.keyupEventHandler = function(event){
		if(event.keyCode === 13) {
			self.validateUser();
		}
	};


}
