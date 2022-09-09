const https = require("https");
const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");

const key = `YOUR_API_KEY`;
const fileCID = `YOUR_FILE_CID`;

async function run() {

  // Creating the collection
  const createCol = await fetch("https://api.estuary.tech/collections/create", {
    method: "POST",
    body: JSON.stringify({
      "description": "test-collection",
      "name": "cats"
    }),
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
  const createColRes = await createCol.json();

  console.log(createColRes);

  /* NOTE (PHIL) Success looks like this:
    {
      createdAt: '2022-09-06T20:57:12.382233061Z',
      uuid: 'e11632d2-b36c-4a43-93a9-5b644a832b93',
      name: 'cats',
      description: 'test-collection',
      userId: 243,
      cid: ''
    }
  */

  // Adding a file to the collection
  const colAdd = await fetch("https://api.estuary.tech/collections/add-content", {
    method: "POST",
    body: JSON.stringify({
      "cids": [fileCID],
      "coluuid": createColRes.uuid,
    }),
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
  const colAddRes = await colAdd.json();

  console.log(colAddRes);

  /* NOTE (PHIL) Success looks like this:
    {}
  */

  // Adding a file with a path to the collection
  const colAddPath = await fetch("https://api.estuary.tech/content/add-ipfs", {
    method: "POST",
    body: JSON.stringify({
      "filename": "nature-6.mp4",
      "root": fileCID,
      "coluuid": createColRes.uuid,
      "dir": "/test-dir/nature-6.mp4", 
    }),
    headers: {
      Authorization: `Bearer ${key}`
    }
  });
  const colAddPathRes = await colAddPath.json();

  console.log(colAddPathRes);

  /* NOTE (PHIL) Success looks like this: 
    {
      requestid: '36533869',
      status: 'queued',
      created: '2022-09-06T22:10:18.678637745Z',
      delegates: [
        '/ip4/3.134.223.177/tcp/6745/p2p/12D3KooWN8vAoGd6eurUSidcpLYguQiGZwt4eVgDvbgaS7kiGTup'
      ],
      info: {},
      pin: {
        cid: 'bafkreibsr2w7ngsu755olsprptddoyihhpiaz7awqoaiad6uob7esjcb6i',
        name: 'nature-6.mp4',
        origins: [],
        meta: {}
      }
    }
  */

}

run();
