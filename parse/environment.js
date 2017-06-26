module.exports = {
	databaseURI: 'mongodb://localhost:27017/bookgig',
	appName: 'bookgig',
	// cloud: __dirname + '/cloud/main.js', // Absolute path to your Cloud Code
	appId: 'bookgig',
	masterKey: 'bookgig', // Keep this key secret!
	serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
	publicServerURL: 'http://localhost:1337/parse',
	parse_mount: '/parse'
};
