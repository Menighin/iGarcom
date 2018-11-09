import cors from 'cors';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import io from 'socket.io';
import setupRoutes from './controllers/routes';
import setupSockets from './sockets/sockets';

var app = express();

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(bodyParser.json());

setupRoutes(app);

const server = http.createServer(app);
const socket = io(server);

server.listen(3000, function () {
  console.log('App listening on port 3000!');
});

setupSockets(socket);