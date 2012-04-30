var http = require('http');

var envSites = process.env.PING_SITES || null;
if(envSites == null) {
  console.log("Set PING_SITES environment variable: i.e. PING_SITES=\"google.com,amazon.com\"");
  process.exit(1);
}
var sites = envSites.split(',');
console.log(sites);

for(var i = 0; i < sites.length; i++) {
  console.log("SITE: " + sites[i]);
  var ping = new SitePinger(sites[i]);
  ping.sendRequest();
}


function SitePinger(site) {
  var self = this;
  self.site = site;
  self.sendRequest = function() {
    console.log("SENDING REQUEST TO: " + self.site);

    var connect_host = self.site;
    var connect_path = '/';

    var options = {
      agent: false,
      host: connect_host,
      port: 80,
      path: connect_path,
      method: 'GET'
    };
    var post_req = http.request(options, function(res) {
      var d = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        d += chunk;
        });
      res.on('end', function () {
        console.log("REQUEST RESPONSE FROM " + self.site + ": Status Code " + res.statusCode);
        setTimeout(self.sendRequest, self.getRandomTime());
        });
    });

    post_req.on('error', function(e) {
      console.log("ERROR: web request to " + site + " failed");
      console.log(e);
      setTimeout(self.sendRequest, self.getRandomTime());
    });

    post_req.end();
  }

  self.getRandomTime = function() {
    // min, max is number of milliseconds to sleep
    var min = 600 * 1000;
    var max = 1200 * 1000;
    var seed = max - min;
    var r = Math.floor((Math.random() * seed) + min);
    console.log("Sleeping For: " + r / 1000 + " Seconds");
    return r;
  }


}

