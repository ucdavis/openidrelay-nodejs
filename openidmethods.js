function authenticate(req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello World  " + req.headers.host + "/authenticate");
  res.end();   
}

function verify(req,res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello World  " + req.headers.host + "/verify");
  res.end();
}

exports.authenticate = authenticate;