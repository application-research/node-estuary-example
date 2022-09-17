const https = require("https");
const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");

const key = "YOUR_API_KEY_HERE";

var formdata = new FormData();
const path = `${__dirname}/test.car`;
formdata.append("data", fs.createReadStream(path));

var myHeaders = formdata.getHeaders();
console.log(myHeaders);

var requestOptions = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${key}`,
    ...myHeaders,
  },
  body: formdata,
};

fetch(
  "https://api.estuary.tech/content/add-car?filename=test_car_upload",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

/* (phil) note -- Success looks like this:

  {
    'content-type': 'multipart/form-data; boundary=--------------------------472499053045546708939768'
  }
  
  {"cid":"bafkreicw6763y5b2mxnpmmtdqosy4lvvigqosahkizzmz7lsc534kqcdl4",
  "retrieval_url":"https://dweb.link/ipfs/bafkreicw6763y5b2mxnpmmtdqosy4lvvigqosahkizzmz7lsc534kqcdl4",
  "estuaryId":36936189,
  "providers":["/ip4/147.28.156.33/tcp/6745/p2p/12D3KooWS6H8t3mLAa2x79imw19VKw1RqmcebWYPfT2L9mp6Xhg2",
  "/ip4/127.0.0.1/tcp/6745/p2p/12D3KooWS6H8t3mLAa2x79imw19VKw1RqmcebWYPfT2L9mp6Xhg2",
  "/ip4/147.28.156.33/udp/6746/quic/p2p/12D3KooWS6H8t3mLAa2x79imw19VKw1RqmcebWYPfT2L9mp6Xhg2",
  "/ip4/127.0.0.1/udp/6746/quic/p2p/12D3KooWS6H8t3mLAa2x79imw19VKw1RqmcebWYPfT2L9mp6Xhg2",
  "/ip4/147.28.156.33/tcp/6747/ws/p2p/12D3KooWS6H8t3mLAa2x79imw19VKw1RqmcebWYPfT2L9mp6Xhg2",
  "/ip4/127.0.0.1/tcp/6747/ws/p2p/12D3KooWS6H8t3mLAa2x79imw19VKw1RqmcebWYPfT2L9mp6Xhg2"]}


*/
