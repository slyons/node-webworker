var assert = require('assert');
var sys = require('sys');

eventRelay.on('ready', function(){
    console.log("Shiny");
});

onmessage = function(e) {
    assert.ok('data' in e);
    assert.ok('foo' in e.data);
    assert.equal(e.data.foo, 'bar');
    eventRelay.emit("assertOkay");

    var msg = {};
    for (k in e.data) {
        msg[e.data[k]] = k;
    }

    //eventRelay.emit("message", msg);
    postMessage(msg);
};
