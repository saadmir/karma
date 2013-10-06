var _ = require('underscore');

module.exports = {

  stringySkills: function(skillsArray) {
    var skills = "";
    _.each(skillsArray, function(skill, index) {
      skills += skill["skill"]["name"] + ", ";
    });
    return skills;
  },
  mungeVolunteers : function(data) {
    var munged = [];
    _.each(data, function(hash, index) {
      munged.push(
        {
          firstName: hash["profile"]["firstName"],
          lastName: hash["profile"]["lastName"],
          email: hash["profile"]["emailAddress"],
          skills: stringifySkills(hash["profile"]["skills"]["values"]),
          image: hash["profile"]["pictureUrl"]
        }
      )
    });
    return {"volunteers": munged}
  }
}
