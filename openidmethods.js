var openid = require('openid');
var url = require('url');
var querystring = require('querystring');
var relyingParty = function(verifyUrl) {
        return new openid.RelyingParty(
        verifyUrl, // Verification URL (yours)
        null, // Realm (optional, specifies realm for OpenID authentication)
        false, // Use stateless verification
        false, // Strict mode
        []); // List of extensions to enable and include
    };

function authenticate(req, res) {
    var relay = relyingParty("http://" + req.headers.host + "/verify");
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.write("Hello World  " + req.headers.host + "/authenticate\n");
    res.end();
}

function verify(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.write("Hello World  " + req.headers.host + "/verify");
    res.end();
}

exports.authenticate = authenticate;