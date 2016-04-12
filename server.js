var express = require('express');
var app = express();
app.use(express.static('public'));
var port = process.env.PORT || 9999;

app.get('/api/foo', function (req, res) {
  res.send("bar");
});

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
