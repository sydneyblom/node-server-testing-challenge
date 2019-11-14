const express = require('express');

const server = express();

server.use(express.json());

//for testing purposes
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up', environment: process.env.DB_ENV });
});

module.exports = server;