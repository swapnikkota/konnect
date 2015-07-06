Router.map(function() {
    this.route('home', {
        path: '/',
        controller: 'homeController'
    });
	this.route('borrow', {
        path: '/borrow',
        controller: 'borrowController'
    });
	this.route('lend', {
        path: '/lend',
        controller: 'lendController'
    });
	this.route('search', {
        path: '/search',
        controller: 'searchController'
    });
	
});




  applicationController = RouteController.extend({
    layoutTemplate: 'appBody'   
  });

  homeController =applicationController.extend({
	   yieldTemplates: {
			'itemSearch': {to: 'workarea'}
		}
	});
  borrowController =applicationController.extend({
	  onBeforeAction : function(){
		  if (!Meteor.userId()) {
			// if the user is not logged in, render the register template
			this.render('postalsearch', {to: 'workarea'});
		  } else {
			// otherwise don't hold up the rest of hooks or our route/action function
			// from running
			this.next();
		  }
	  },
	  
	   yieldTemplates: {
			'itemslist': {to: 'workarea'}
		},
		
		action: function () {
			this.render();
		}
		
		
	});
  searchController =applicationController.extend({
	  onBeforeAction : function(){
		  if (!Meteor.userId()) {
			// if the user is not logged in, render the register template
			this.render('register', {to: 'workarea'});
		  } else {
			// otherwise don't hold up the rest of hooks or our route/action function
			// from running
			this.next();
		  }
	  },

	   yieldTemplates: {
			'itemslist': {to: 'workarea'}
		},
		
		action: function () {
			this.render();
		}
	});
	
	/*var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('itemsearch', {to: 'workarea'});
    }
  } else {
    this.next();
  }
}
	
	
	Router.onBeforeAction(requireLogin, {only: 'itemsearch'});*/
