/**
 * @description jest  server
 * @author cyq
 */
const request = require('supertest');

const server = require('../app').callback();

module.exports = request(server);

