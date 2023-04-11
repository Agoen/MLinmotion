// Import dependency "osc-js"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Initialize the library
const OSC = require('osc-js');

// Set the output port, goes to Prokol locally
const osc = new OSC({
  plugin: new OSC.DatagramPlugin({ send: { port: 9000 } })
});
osc.open()

// Message to send to protokol
const message = new OSC.Message('/test/path', 2.5, 'X coord: ##, Y coord: ##', 665);
osc.send(message);