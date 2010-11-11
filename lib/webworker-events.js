var events = require('events');
var sys = require('sys');
var EventEmitter = events.EventEmitter;
var wwutil = require('./webworker-util');

var WorkerEventRelay = function(ms) {
    var self = this;
    EventEmitter.call(this);
    
    var handleMessage = function(msg, fd){
        if (!wwutil.isValidMessage(msg)) {
            return;
        }
        switch(msg[0]) {
            case wwutil.MSGTYPE_EVENT:
                self.localEmit.apply(self, msg[1]);
                break;
        }
    };
    
    
    ms.on('msg', handleMessage);
    
    self.emit = function(eventType){
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(eventType);
        ms.send([wwutil.MSGTYPE_EVENT, args]);
    };
};
sys.inherits(WorkerEventRelay, EventEmitter);

WorkerEventRelay.prototype.localEmit = EventEmitter.prototype.emit;

exports.WorkerEventRelay = WorkerEventRelay;