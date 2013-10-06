App.OpportunitiesNewController = Ember.ObjectController.extend({

  actions: {
    createOpportunity: function(){
      // Get the title set by the "Title" text field
      var title = this.get('title');
      if (!title.trim()) { return; }

      // Save the new model
      this.get('model').save();

      // Clear the form
      this.set('model', this.store.createRecord('opportunity'));
    }
  }

});

App.VolunteersSignupController = Ember.ObjectController.extend({

  actions: {
    doLinkedIn: function(){
    //IN.Event.on(IN, "auth", function(){ console.log('this is authd');} );
    var self = this;

    var lnkd =  function (){
        IN.API.Profile("me")
        .fields(["id", "firstName", "lastName", "email-address", "pictureUrl","headline","publicProfileUrl",'skills'])
        .result(function(result) {
          console.dir(result);
          var profile = result.values[0];
          var url = '/volunteer/';
          jQuery.post(url,profile)
          .done(function(data){
            console.dir(data);
            var v = data.volunteers[0];
            self.set('name',v.name);
            self.set('email',v.email);
            self.set('description',v.skills);
            //profHTML = "<p><a href=\"" + profile.publicProfileUrl + "\">";
            //profHTML += "<img class=img_border align=\"left\" src=\"" + profile.pictureUrl + "\"></a>";
            //profHTML += "<a href=\"" + profile.publicProfileUrl + "\">";
            //profHTML += "<h2 class=myname>" + profile.firstName + " " + profile.lastName + "</a> </h2>";
            //profHTML += "<span class=myheadline>" + profile.headline + "</span>";
            //$("#profile").html(profHTML);
          });
        });
      };

      if (!IN.User.isAuthorized()){
        IN.User.authorize(lnkd);
      } else {
        lnkd();
      }
    },
    registerVolunteer: function(){
      // Get the name set by the "Name" text field
      var name = this.get('name');
      if (!name.trim()) { return; }

      // Save the new model
      this.get('model').save();

      // Clear the form
      this.set('model', this.store.createRecord('volunteer'));
    }
  }

});

