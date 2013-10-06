App = Ember.Application.create();

App.Router.map(function() {
  this.resource('opportunities', function() {
    this.route('new');
  });
  this.resource('volunteers', function() {
    this.route('signup');
  });
});


App.OpportunitiesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('opportunity');
  }
});

App.OpportunitiesNewRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('opportunity');
  }
});

App.VolunteersIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('volunteer');
  }
});
App.VolunteersSignupRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('volunteer');
  }
});

