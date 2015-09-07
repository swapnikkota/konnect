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
	
	this.route('addressForm', {
        path: '/addressForm',
        controller: 'addressFormController'
    });
	
});


Router.onBeforeAction(function() {
  GoogleMaps.load({
   key: 'AIzaSyDYV7es-lqpBeJafZdHpCBQ3jNs2IriimA',
    libraries: 'places'
  });
  this.next();
});



  applicationController = RouteController.extend({
    layoutTemplate: 'appBody'   
  });
  
  standardController = RouteController.extend({
    layoutTemplate: 'standard'   
  });

  homeController =applicationController.extend({
	   onBeforeAction : function(){
		  if (Meteor.userId()) {			  
			if (Meteor.user().profile.address == null)
				Router.go('addressForm');
			else
				this.next();			  			  
		  } else {
			// otherwise don't hold up the rest of hooks or our route/action function
			// from running
			this.next();
		  }
	  },
	   yieldTemplates: {
			'itemSearch': {to: 'workarea'}
		}
	});
  lendController =standardController.extend({
	   onBeforeAction : function(){
		  Session.set("lend", true);
		  if (!Meteor.userId()) {			  
			// if the user is not logged in, render the register template
			this.render('register', {to: 'workarea'});			
		  } else {
			// otherwise don't hold up the rest of hooks or our route/action function
			// from running
			if (Meteor.user().profile.address == null)
					Router.go('addressForm');
				else
					this.next();			
		  }
	  },
	   yieldTemplates: {
			'lendItem': {to: 'workarea'}
		}
	});
  borrowController =standardController.extend({
	  onBeforeAction : function(){
		  if (!Meteor.userId()) {
			  if(!Session.get('itemSearched')){				 
				// if the user is not searched, render the itemSearch template
				this.render('itemSearch', {to: 'workarea'});
			  }else{
				// if the user is not logged in, render the register template
				this.render('postalsearch', {to: 'workarea'});				
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
  searchController =standardController.extend({
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
	
	addressFormController =standardController.extend({
	  onBeforeAction : function(){
		  if (!Meteor.userId()) {
			  if(!Session.get('itemSearched')){				 
				// if the user is not searched, render the itemSearch template
				this.render('itemSearch', {to: 'workarea'});
			  }else{
				// if the user is not logged in, render the register template
				this.render('postalsearch', {to: 'workarea'});				
			  }
		  } else {
			  if(Meteor.user().profile.address != null){
				  this.render('itemslist', {to: 'workarea'});
			  }else{
				  // otherwise don't hold up the rest of hooks or our route/action function
				// from running
				this.next();
			  }
			
		  }
	  },
	   yieldTemplates: {
			'addressForm': {to: 'workarea'}
		},	
		
		action: function () {
			this.render();
		}
		
		
	});