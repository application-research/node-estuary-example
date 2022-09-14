const https = require("https");
const fetch = require("node-fetch");

const key = `YOUR_API_KEY_HERE`;
const fileCID = `YOUR_FILE_CID_HERE`; // test cid: bafybeicgpnok4bl2rkf4ceojlb376henq6f6ufwqqvyyzmuo4xloxypuwm

fetch("https://api.estuary.tech/content/add-ipfs", {
  method: "POST",
  body: JSON.stringify({
    filename: "node-test-video",
    peers: [],
    root: fileCID,
  }),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  },
})
  .then(function (res) {
    return res.json();
  })
  .then(function (json) {
    console.log(json);
  });

/* (phil) note -- success looks like this:

  {
    requestid: '36874412',
    status: 'queued',
    created: '2022-09-13T17:56:42.106143351Z',
    delegates: [
      '/ip4/139.178.81.141/tcp/6747/ws/p2p/12D3KooWHe2fZ6jJJ2K2oX3EjMiXMRzvHVA5mvgYYvZvi7tEYNMe',
      '/ip4/127.0.0.1/tcp/6747/ws/p2p/12D3KooWHe2fZ6jJJ2K2oX3EjMiXMRzvHVA5mvgYYvZvi7tEYNMe',
      '/ip4/139.178.81.141/tcp/6745/p2p/12D3KooWHe2fZ6jJJ2K2oX3EjMiXMRzvHVA5mvgYYvZvi7tEYNMe',
      '/ip4/127.0.0.1/tcp/6745/p2p/12D3KooWHe2fZ6jJJ2K2oX3EjMiXMRzvHVA5mvgYYvZvi7tEYNMe',
      '/ip4/139.178.81.141/udp/6746/quic/p2p/12D3KooWHe2fZ6jJJ2K2oX3EjMiXMRzvHVA5mvgYYvZvi7tEYNMe',
      '/ip4/127.0.0.1/udp/6746/quic/p2p/12D3KooWHe2fZ6jJJ2K2oX3EjMiXMRzvHVA5mvgYYvZvi7tEYNMe'
    ],
    info: {},
    pin: {
      cid: 'bafybeicgpnok4bl2rkf4ceojlb376henq6f6ufwqqvyyzmuo4xloxypuwm',
      name: 'node-test-video',
      origins: [],
      meta: {}
    }
  }

*/
