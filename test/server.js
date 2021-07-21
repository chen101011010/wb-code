/**
 * @description jest  server
 * @author cyq
 */
const request = require('supertest');

const server = require('../src/app').callback();

module.exports = request(server);

