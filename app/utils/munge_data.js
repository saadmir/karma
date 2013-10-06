var _ = require('underscore');

var stringifySkills = function(skillsArray) {
  var skills = "";
  _.each(skillsArray, function(skill, index) {
    skills += skill["skill"]["name"] + ", ";
  });
  return skills;
};

module.exports = {
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
