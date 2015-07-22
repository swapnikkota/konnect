if (Meteor.isClient) {
Accounts.ui.config({
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
});

Accounts.onLogin(function() {
	if(Meteor.user().profile.postalCode == null){
		Router.go('addressForm');
	}else{
		console.log(Meteor.user().profile.postalCode);
	}
	
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  Session.set('itemSearched', "");
  Router.go('/');
}

AccountsTemplates.configure({
    confirmPassword: false,
    enablePasswordChange: false,
    forbidClientAccountCreation: false,
    sendVerificationEmail: false,
	showForgotPasswordLink: true
   // homeRoutePath: '/',
   // redirectTimeout: 2000,
});

AccountsTemplates.configure({
    texts: {
      title: {
        changePwd: "Password Title",
        enrollAccount: "Enroll Title",
        forgotPwd: "Forgot Pwd Title",
        resetPwd: "Reset Pwd Title",
        signIn: "",
        signUp: "Register now to notify your neighbours. It's free!",
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
        if (user)
          Router.go('addressForm');
    }
});

}
