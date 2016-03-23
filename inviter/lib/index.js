/**
 * Lib
 */

var request = require('request');
var config = {
    slack_domain : process.env.slack_domain,
    slack_token : process.env.slack_token,
};

module.exports.respond = function(event, cb) {

    if ( ! event.email ) {
        return cb( { error : 'missing email parameter' } );
    }

    request.post({
        url: 'https://'+ config.slack_domain + '/api/users.admin.invite',
        form: {
          email: event.email,
          token: config.slack_token,
          set_active: true
        }
    }, function(err, httpResponse, body) {
        cb( err, body );
        // body looks like:
        //   {"ok":true}
        //       or
    } );

};
