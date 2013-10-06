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
    //return this.store.createRecord('opportunity');
    var o = this.store.createRecord('opportunity');

    jQuery.get('/skills',{}).done(function(data){
      o.set('allskills',data.skills);
    });

    return o;
  }
});

App.VolunteersIndexRoute = Ember.Route.extend({
  model: function() {
    //return this.store.find('volunteer');
    var vs = this.store.find('volunteer');
    vs.then(function(vv){
      vv.forEach(function(v){ v.set('orgName', (window.orgName || 'Karma') ); });
    });
    return vs;
  },
  actions: {
    sendMail: function(emailAddress){
      console.dir(arguments);
      var url = '/sendmail';
      var data = {
        volunteer: emailAddress,
        orgName: (window.orgname || 'Karma'),
      };
      jQuery.post(url,data)
        .done(function(data){
          console.dir(data);
        });
    }
  }
});

App.VolunteersSignupRoute = Ember.Route.extend({
  model: function() {
    return this.store.createRecord('volunteer');
  }
});

