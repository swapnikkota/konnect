//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var AutoForm = Package['aldeed:autoform'].AutoForm;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/yogiben:autoform-map/lib/client/template.autoform-map.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("afMap");                                                                                        // 2
Template["afMap"] = new Template("Template.afMap", (function() {                                                      // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "data-schema-key": function() {                                                                                   // 6
      return Spacebars.mustache(view.lookup("schemaKey"));                                                            // 7
    },                                                                                                                // 8
    reverse: function() {                                                                                             // 9
      return Spacebars.mustache(Spacebars.dot(view.lookup("atts"), "reverse"));                                       // 10
    }                                                                                                                 // 11
  }, HTML.Raw('\n		<input type="text" class="js-lat" style="display: none">\n		<input type="text" class="js-lng" style="display: none">\n		<input type="text" class="controls af-map-search-box js-search af-map-search-box-hidden">\n		'), Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("atts"), "geolocation"));                                         // 13
  }, function() {                                                                                                     // 14
    return [ "\n		", HTML.A({                                                                                         // 15
      style: "margin-bottom:5px;",                                                                                    // 16
      "class": "btn btn-default js-locate"                                                                            // 17
    }, "\n			", HTML.I({                                                                                              // 18
      "class": function() {                                                                                           // 19
        return [ "fa ", Blaze.If(function() {                                                                         // 20
          return Spacebars.call(view.lookup("loading"));                                                              // 21
        }, function() {                                                                                               // 22
          return "fa-spin fa-circle-o-notch";                                                                         // 23
        }, function() {                                                                                               // 24
          return "fa-map-marker";                                                                                     // 25
        }) ];                                                                                                         // 26
      }                                                                                                               // 27
    }), " My location\n		"), "\n		" ];                                                                                // 28
  }), "\n		", HTML.DIV({                                                                                              // 29
    "class": "js-map",                                                                                                // 30
    style: function() {                                                                                               // 31
      return [ "width:", Spacebars.mustache(view.lookup("width")), "; height:", Spacebars.mustache(view.lookup("height")), ";" ];
    }                                                                                                                 // 33
  }), "\n	");                                                                                                         // 34
}));                                                                                                                  // 35
                                                                                                                      // 36
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/yogiben:autoform-map/lib/client/autoform-map.coffee.js                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var KEY_ENTER, defaults, initTemplateAndGoogleMaps;

KEY_ENTER = 13;

defaults = {
  mapType: 'roadmap',
  defaultLat: 1,
  defaultLng: 1,
  geolocation: false,
  searchBox: false,
  autolocate: false,
  zoom: 13
};

AutoForm.addInputType('map', {
  template: 'afMap',
  valueOut: function() {
    var lat, lng, node;
    node = $(this.context);
    lat = node.find('.js-lat').val();
    lng = node.find('.js-lng').val();
    if (lat.length > 0 && lng.length > 0) {
      return {
        lat: lat,
        lng: lng
      };
    }
  },
  contextAdjust: function(ctx) {
    ctx.loading = new ReactiveVar(false);
    return ctx;
  },
  valueConverters: {
    string: function(value) {
      if (this.attr('reverse')) {
        return "" + value.lng + "," + value.lat;
      } else {
        return "" + value.lat + "," + value.lng;
      }
    },
    numberArray: function(value) {
      return [value.lng, value.lat];
    }
  }
});

Template.afMap.created = function() {
  return GoogleMaps.load({
    libraries: 'places'
  });
};

initTemplateAndGoogleMaps = function() {
  var input, location, mapOptions, searchBox;
  this.data.options = _.extend({}, defaults, this.data.atts);
  this.data.marker = void 0;
  this.data.setMarker = (function(_this) {
    return function(map, location, zoom) {
      if (zoom == null) {
        zoom = 0;
      }
      _this.$('.js-lat').val(location.lat());
      _this.$('.js-lng').val(location.lng());
      if (_this.data.marker) {
        _this.data.marker.setMap(null);
      }
      _this.data.marker = new google.maps.Marker({
        position: location,
        map: map
      });
      if (zoom > 0) {
        return _this.data.map.setZoom(zoom);
      }
    };
  })(this);
  mapOptions = {
    zoom: 0,
    mapTypeId: google.maps.MapTypeId[this.data.options.mapType],
    streetViewControl: false
  };
  if (this.data.atts.googleMap) {
    _.extend(mapOptions, this.data.atts.googleMap);
  }
  this.data.map = new google.maps.Map(this.find('.js-map'), mapOptions);
  if (this.data.value) {
    location = typeof this.data.value === 'string' ? this.data.value.split(',') : this.data.value.hasOwnProperty('lat') ? [this.data.value.lat, this.data.value.lng] : [this.data.value[1], this.data.value[0]];
    location = new google.maps.LatLng(parseFloat(location[0]), parseFloat(location[1]));
    this.data.setMarker(this.data.map, location, this.data.options.zoom);
    this.data.map.setCenter(location);
  } else {
    this.data.map.setCenter(new google.maps.LatLng(this.data.options.defaultLat, this.data.options.defaultLng));
    this.data.map.setZoom(this.data.options.zoom);
  }
  if (this.data.atts.searchBox) {
    input = this.find('.js-search');
    this.data.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    searchBox = new google.maps.places.SearchBox(input);
    google.maps.event.addListener(searchBox, 'places_changed', (function(_this) {
      return function() {
        location = searchBox.getPlaces()[0].geometry.location;
        _this.data.setMarker(_this.data.map, location);
        return _this.data.map.setCenter(location);
      };
    })(this));
    $(input).removeClass('af-map-search-box-hidden');
  }
  if (this.data.atts.autolocate && navigator.geolocation && !this.data.value) {
    navigator.geolocation.getCurrentPosition((function(_this) {
      return function(position) {
        location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        _this.data.setMarker(_this.data.map, location, _this.data.options.zoom);
        return _this.data.map.setCenter(location);
      };
    })(this));
  }
  if (typeof this.data.atts.rendered === 'function') {
    this.data.atts.rendered(this.data.map);
  }
  google.maps.event.addListener(this.data.map, 'click', (function(_this) {
    return function(e) {
      return _this.data.setMarker(_this.data.map, e.latLng);
    };
  })(this));
  return this.$('.js-map').closest('form').on('reset', (function(_this) {
    return function() {
      var _ref;
      _this.data.marker && _this.data.marker.setMap(null);
      _this.data.map.setCenter(new google.maps.LatLng(_this.data.options.defaultLat, _this.data.options.defaultLng));
      return _this.data.map.setZoom(((_ref = _this.data.options) != null ? _ref.zoom : void 0) || 0);
    };
  })(this));
};

Template.afMap.rendered = function() {
  return this.autorun((function(_this) {
    return function() {
      return GoogleMaps.loaded() && initTemplateAndGoogleMaps.apply(_this);
    };
  })(this));
};

Template.afMap.helpers({
  schemaKey: function() {
    return this.atts['data-schema-key'];
  },
  width: function() {
    if (typeof this.atts.width === 'string') {
      return this.atts.width;
    } else if (typeof this.atts.width === 'number') {
      return this.atts.width + 'px';
    } else {
      return '100%';
    }
  },
  height: function() {
    if (typeof this.atts.height === 'string') {
      return this.atts.height;
    } else if (typeof this.atts.height === 'number') {
      return this.atts.height + 'px';
    } else {
      return '200px';
    }
  },
  loading: function() {
    return this.loading.get();
  }
});

Template.afMap.events({
  'click .js-locate': function(e, t) {
    e.preventDefault();
    if (!navigator.geolocation) {
      return false;
    }
    this.loading.set(true);
    return navigator.geolocation.getCurrentPosition((function(_this) {
      return function(position) {
        var location;
        location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        _this.setMarker(_this.map, location, _this.options.zoom);
        _this.map.setCenter(location);
        return _this.loading.set(false);
      };
    })(this));
  },
  'keydown .js-search': function(e) {
    if (e.keyCode === KEY_ENTER) {
      return e.preventDefault();
    }
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['yogiben:autoform-map'] = {};

})();
