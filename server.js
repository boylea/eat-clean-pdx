var createApp = require('./app.js');
var app = createApp();

var port = process.env.PORT || 3000;

app.listen(port, function (err) {
  if (err) throw err;
  console.log('Listening on', port);
})
