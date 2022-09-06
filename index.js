const https = require("https");
const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");

const key = `YOUR_API_KEY`;

var form = new FormData();
const path = `${__dirname}/nature-6.mp4`;
form.append("data", fs.createReadStream(path));

const headers = form.getHeaders();
console.log(headers);

fetch("https://upload.estuary.tech/content/add", {
  method: "POST",
  body: form,
  headers: {
    Authorization: `Bearer ${key}`,
    ...headers,
  },
})
  .then(function(res) {
    return res.json();
  })
  .then(function(json) {
    console.log(json);
  });

/*NOTE(Jim)
  Success looks like this

  {
    'content-type': 'multipart/form-data; boundary=--------------------------225027799253021671631288'
  }
  { cid: 'Qmch2cHCE4WXV32vyaLgWXYqE7VSLYwrT7xJ6tpxqq3NP5' }
*/

/*NOTE(jim)
  Failure isn't properly handled, needs JSON error response.

(node:77395) UnhandledPromiseRejectionWarning: FetchError: invalid json response body at https://shuttle-1.estuary.tech/content/add reason: Unexpected end of JSON input
    at /Users/whiteharbor/Development/node-estuary-example/node_modules/node-fetch/lib/index.js:272:32
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:77395) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
(node:77395) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
*/
