if (Meteor.isClient) {
/*Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [ {
        fieldName: 'name',
        fieldLabel: 'Name',
        inputType: 'input',
        visible: true,
        saveToProfile: true,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('Please provide us your name.');
                return false;
            }
        }
    }, {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: true,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('You must accept the terms and conditions.');
                return false;
            }
        }
    } ]
});*/

Accounts.onLogin(function() {
	if(Meteor.user().profile.address == null){
		//addressForm
		Meteor.defer(function() { Router.go('addressForm'); });
		//Router.go('addressForm');
	}else{
		if(Router.current() == null || Router.current().route == null ||
				Router.current().route.getName() == null ||
				Router.current().route.getName() != 'lend')
			Meteor.defer(function() { Router.go('borrow'); });	
			//Router.go('borrow');
		else
			Meteor.defer(function() { Router.go(Router.current().route.getName()); });
			//Router.go(Router.current().route.getName());

	}

});

/*accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  Session.set('itemSearched', "");
  Router.go('/');
}*/

var myPostLogout = function(){
    //example redirect after logout
	Session.keys = {};
	Session.clearPersistent();
	console.log('logout called');
	Router.go('/');
};

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
        var user = Meteor.user();
        if (user.profile.address == null)
			Meteor.defer(function() { Router.go('addressForm'); });
          //Router.go('addressForm');
		else{
			if(Session.get('lend')){
				Meteor.defer(function() { Router.go('lend'); });
			}
			else if(Router.current() ==null || 
					Router.current().route == null || 
					Router.current().route.getName() == null ||
					Router.current().route.getName() != 'lend'){
					console.log('redirecting to borrow');
					//Router.go('borrow');
					Meteor.defer(function() { Router.go('borrow'); });
				}
			else{
				Meteor.defer(function() { Router.go(Router.current().route.getName());});
			}
		}
    }
    if (state === "signUp") {
      // Successfully registered
	  Meteor.defer(function() { Router.go('addressForm'); });
      //Router.go('addressForm');
    }
  }
};

AccountsTemplates.configure({
    confirmPassword: false,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    sendVerificationEmail: false,
	showForgotPasswordLink: true,
	onLogoutHook: myPostLogout,
	onSubmitHook: mySubmitFunc
   // homeRoutePath: '/',
   // redirectTimeout: 2000,
});

AccountsTemplates.configure({
    texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Enroll Title",
        forgotPwd: "Forgot my password!!!",
        resetPwd: "Reset my Password",
        signIn: "Login with your credentials.",
        signUp: "Connect with your neighbours.",
        verifyEmail: "Verify Email Title",
      }
    }
});
//AccountsTemplates.removeField('password_again');
AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: "Name",
    //func: function(value){return value !== 'Full Name';},
    errStr: 'Only "Full Name" allowed!',
	required: true
});



AccountsTemplates.configureRoute('signIn', {
	layoutTemplate: 'appBody',
	yieldTemplates: {
			'register': {to: 'workarea'}
		},
	redirect: function(){
        var user = Meteor.user();
        if (user.profile.address == null)
			Meteor.defer(function() { Router.go('addressForm'); });
          //Router.go('addressForm');
		else{
			if(Session.get('lend')){
				Meteor.defer(function() { Router.go('lend'); });
			}
			else if(Router.current() ==null || 
					Router.current().route == null || 
					Router.current().route.getName() == null ||
					Router.current().route.getName() != 'lend'){
					console.log('redirecting to borrow');
					//Router.go('borrow');
					Meteor.defer(function() { Router.go('borrow'); });
				}
			else{
				Meteor.defer(function() { Router.go(Router.current().route.getName());});
			}
		}

    }
});

}
