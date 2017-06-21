// Example express application adding the parse-server module to expose Parse
// compatible API routes.
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var AzureStorageAdapter = require('parse-server-azure-storage').AzureStorageAdapter;
var ParseDashboard = require('parse-dashboard');

// Process handles environment creation
if( process.env.ENVIRONMENT ){
  var env = process.env;
} else {
  var env = require('./environment');
}

var appEnv = env.ENVIRONMENT;

var parseServer = new ParseServer({
  databaseURI: env.DATABASE_URI,
  cloud: __dirname + '/web/cloud/main.js',
  appId: env.APP_ID,
  masterKey: env.MASTER_KEY, //Add your master key here. Keep it secret!
  serverURL: env.PUBLIC_SERVER_URL,
  publicServerURL : env.PUBLIC_SERVER_URL,
  appName: env.APP_NAME,
  // filesAdapter: new AzureStorageAdapter(
  //   env.BLOB_ACCOUNT_NAME,
  //   env.BLOB_CONTAINER,
  //   { accessKey : env.BLOB_ACCESS_KEY, directAccess:true }
  // ),
  fileKey: env.FILE_KEY,
  verbose : false //true
});

var app = express();

// Fix SSL issues when using ssl locally
if( appEnv == 'local' ){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

var publicFolderPath = __dirname + '/web/public';

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';

// Serve static files from the specified public environment
app.use(mountPath, parseServer);
app.use(express.static(publicFolderPath));

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('parse-server ' + appEnv + ' running on port ' + port + '.');
});

var dashboardConfig = {
  apps: [
    {
      appId: env.APP_ID,
      serverURL: env.PUBLIC_SERVER_URL,
      masterKey: env.MASTER_KEY,
      appName: env.APP_NAME
    }
  ],
  users: [
    {
      user: env.APP_ID,
      pass: env.MASTER_KEY
    }
  ]
};

app.use('/parse-dashboard', ParseDashboard(dashboardConfig, true));

// Deny access to iframes
app.use(function(req, res, next) {
    res.setHeader('X-Frame-Options', 'DENY');
    return next();
});

// Require the app routes, injecting the express instance
require("./web/cloud/routes.js")( app );
require("./web/cloud/cloud.authors.js");
require("./web/cloud/cloud.categories.js");

// Require jobs
require("./web/cloud/job.testevents.js");
require("./web/cloud/job.fixcontenttype.js");
require("./web/cloud/job.waterstonesimport.js");
require("./web/cloud/job.uploadsimport.js");
require("./web/cloud/job.generateauthors.js");
require("./web/cloud/job.createcategories.js");
