'use strict';

var request = require('request');

var config = {
    slack_domain : process.env.slack_domain,
    slack_token : process.env.slack_token,
};

module.exports.invite = (event, context, callback) => {
    var cb = function( data ) {
        callback(null, { statusCode: 200, body: JSON.stringify( data ), headers: { "Access-Control-Allow-Origin" : "*" } } );
    }

    var data = JSON.parse(event.body);

    if ( ! data.email ) {
        return cb( { error : 'missing email parameter' } );
    }

    request.post({
        url: 'https://'+ config.slack_domain + '/api/users.admin.invite',
        form: {
          email: data.email,
          token: config.slack_token,
          set_active: true
        }
    }, function(err, httpResponse, body) {
        if ( err ) {
            return cb( { error : err, body: body } );
        }
        cb( JSON.parse( body ) );
    } );
};
