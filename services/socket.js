'use strict';
const logger = require('./logger').createLogger();
const SOCKET_CONS = require('../constant/event').SOCKET;
const monitorService = require('./monitorService');
module.exports = exports = Socket;

/**
 * construct function
 * @param {socket.io} io
 */
function Socket(io) {
  if (arguments.length === 0)
    throw Error('This constructor need a socket.ip instance as parameter');
  this.nsp = io;
}

Socket.prototype.connect = function() {
  const self = this;
  this.nsp.on('connection', (socket) => {
    socket.on(SOCKET_CONS.GET_PIPELINE_STATE_STATS, getPipelineStateStats(socket));
    socket.on('disconnect', self.eventDisconnect(socket));
  });
};

Socket.prototype.eventDisconnect = function(socket) {
  return function() {
    logger.info('>>>> socket disconnect, deleting object socket.id: ' + socket.id);
  };
};

function getPipelineStateStats(socket) {
  return async function(data) {
    const result = await monitorService.dataAnalysis(data.pipelineId, data.dataType, data.date);
    socket.emit(SOCKET_CONS.PIPELINE_STATE_STATS, result);
  };

}
