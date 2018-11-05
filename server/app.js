import cors from 'cors';
import express from 'express';
var app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/json', function (req, res) {
  res.send({id: 0, name: 'test'});
});