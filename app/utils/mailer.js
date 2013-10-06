var _         = require('underscore'),
    path      = require('path');
    Q         = require('q'),
    nodemailer = require("nodemailer");

module.exports = function(app){

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "sm94066@gmail.com",
        pass: ""
    }
});

var sendmail = function(recipients,orgName){

  var body = [
      "Hi, ",
      "We'd like ot request your help on " + orgName + " .  ",
      "Please let us know if you are available to take this project on!.  ",
      "Thank you and we look forward to hear from you. ",
      "Sincerely, ",
      orgName
  ].join(' ');

  var mailOptions = {
    from: "Karma ✔ <sm94066@gmail.com>", // sender address
    to: recipients.join(','), // list of receivers
    subject: orgName + ' woudl like to request your help', // Subject line
    text: body
  }

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      app.log.error(error);
    }else{
      app.log.info("Message sent: " + response.message);
    }
    smtpTransport.close();
  });
};


  return {
    sendmail:         sendmail
  };
};

