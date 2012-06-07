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
    var rely = relyingParty("http://" + req.headers.host + "/verify");

    var parsedUrl = url.parse(req.url);
    var query = querystring.parse(parsedUrl.query);
    var identifier = query.openid_identifier; // User supplied identifier
    // Resolve identifier, associate, and build authentication URL
    rely.authenticate(identifier, false, function(error, authUrl) {
        if (error) {
            res.writeHead(200);
            res.end('Authentication failed: ' + error.message);
        }
        else if (!authUrl) {
            res.writeHead(200);
            res.end('Authentication failed');
        }
        else {
            res.writeHead(302, {
                Location: authUrl
            });
            res.end();
        }
    });
}

function verify(req, res) {
    var rely = relyingParty("http://" + req.headers.host + "/verify");
    // Verify identity assertion
    // NOTE: Passing just the URL is also possible
    rely.verifyAssertion(req, function(error, result) {
        if (!error && result.authenticated) {
            req.session.auth = true;
            req.session.authname = result.claimedIdentifier;

            res.writeHead(302, {
                Location: '/'
            });
            res.end();
        }
        else {
            res.writeHead(200);
            res.end('Failure :(');
        }
    });
}

exports.authenticate = authenticate;
exports.verify = verify;