const OSC = require('osc-js');

const osc = new OSC({
  plugin: new OSC.DatagramPlugin({ send: { port: 9000 } })
});
osc.open()

const message = new OSC.Message('/test/path', 521.25, 'teststring', 665);
osc.send(message);


