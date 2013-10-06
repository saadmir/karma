var _ = require('underscore');

var stringifySkills = function(skillsArray) {
  var skills = "";
  _.each(skillsArray, function(skill, index) {
    skills += skill["skill"]["name"] + ", ";
  });
  return skills;
};

module.exports = {
  mungeOpportunities : function(data) {
    var munged = [];
    _.each(data, function(hash, index) {
      munged.push(
        {
          id: hash.id,
          title: hash.title,
          orgName: hash.profile.orgName,
          orgURL: hash.profile.orgURL,
          email: hash.profile.email,
          location: hash.profile.location,
          lat: hash.profile.lat,
          long: hash.profile.long,
          description: hash.profile.description,
          commitment: hash.profile.commitment,
          causes: hash.profile.casuses,
          skills: hash.profile.skills
        }
      );
    });
    return {'opportunities': munged};
  },

  mungeSkills : function(volunteers) {
    var skills = [];
    _(volunteers).each(function(volunteer, index){
      _(volunteer.profile.skills.values).each(function(skill, index){
        skills[skills.length] = skill.skill.name;
      });
    });
    return {skills: skills};
  },

  mungeVolunteers : function(data) {
    var munged = [];
    _.each(data, function(hash, index) {
      munged.push(
        {
          id: hash.lnkdid,
          name: hash.profile.firstName + ' ' + hash.profile.lastName,
          email: hash["profile"]["emailAddress"],
          skills: stringifySkills(hash["profile"]["skills"]["values"]),
          image: hash["profile"]["pictureUrl"]
        }
      );
    });
    return {"volunteers": munged};
  }
};
