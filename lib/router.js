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


Router.onBeforeAction(function() {
  GoogleMaps.load({
   key: 'AIzaSyDYV7es-lqpBeJafZdHpCBQ3jNs2IriimA',
    libraries: 'places'
  });
  this.next();
}, { only: ['borrow'] });



  applicationController = RouteController.extend({
    layoutTemplate: 'appBody'   
  });

  homeController =applicationController.extend({
	   yieldTemplates: {
			'itemSearch': {to: 'workarea'}
		}
	});
  lendController =applicationController.extend({
	   yieldTemplates: {
			'lendItem': {to: 'workarea'}
		}
	});
  borrowController =applicationController.extend({
	  onBeforeAction : function(){
		  if (!Meteor.userId()) {
			  if(!Session.get('itemSearched')){				 
				// if the user is not searched, render the itemSearch template
				this.render('itemSearch', {to: 'workarea'});
			  }else{
				// if the user is not logged in, render the register template
				this.render('postalsearch', {to: 'workarea'});
				//this.next();
			  }
		  } else {
			// otherwise don't hold up the rest of hooks or our route/action function
			// from running
			this.next();
		  }
	  },
	  
	   yieldTemplates: {
			'itemslist': {to: 'workarea'}
		},
		data: function() {  	
			//nsole.log(Session.get('searchResults').pic);
			imageSrc:  Session.get('photo');
		},
		
		action: function () {
			this.render();
		}
		
		
	});
  searchController =applicationController.extend({
	  onBeforeAction : function(){
		  if (!Meteor.userId()) {
			  if(!Session.get('itemSearched')){				 
				// if the user is not searched, render the itemSearch template
				this.render('itemSearch', {to: 'workarea'});
			  } else if(!Session.get('postalCode')){				 
				// if the user is not searched, render the itemSearch template
				this.render('postalsearch', {to: 'workarea'});
			  }  else{
				// if the user is not logged in, render the register template
				this.render('register', {to: 'workarea'});
			  }
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
