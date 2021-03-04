const { mailHost, mailPort, mailAuth, mailFrom } = require("../.env");

module.exports = {
  mailHost: mailHost,
  mailPort: mailPort,
  mailAuth: {
    user: mailAuth.user,
    pass: mailAuth.pass,
  },
  mailFrom: mailFrom,
};
