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
	console.log(Meteor.user());
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
        signUp: "",
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
AccountsTemplates.addFields([
	{
        _id: 'postalCode',
        type: 'text',
        displayName: "PostalCode",
		required: true
    },
    {
        _id: 'streetName',
        type: 'text',
        displayName: "Street Name",
		required: true
    },
    {
        _id: 'buildingName',
        type: 'text',
        displayName: "Building Name",
		required: true
    },	
	{
        _id: 'unit',
        type: 'text',
        displayName: "Unit Number",
		required: true
    },
	{
        _id: 'block',
        type: 'text',
        displayName: "Block",
		required: true
    }
]);


AccountsTemplates.configureRoute('signIn', {
	layoutTemplate: 'appBody',
	yieldTemplates: {
			'register': {to: 'workarea'}
		}
});



}
