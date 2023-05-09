const esbuild = require('esbuild');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');
const stdLibBrowser = require('node-stdlib-browser');
const fs = require('fs');
const path = require('path');
const servor = require('servor');
const multer = require('multer');
// File Upload
const aws = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser')
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();
var db;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    // or 
    // uuid, or fieldname
    cb(null, originalname);
  }
})


const uri = 'mongodb://127.0.0.1:27017'; // Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    /*
    await client.connect(); // Establish and verify connection
    await client.db('myAppDB').collection('images');
    app.locals.imageCollection = client.db('myAppDB').collection('images');
    console.log('Connected successfully to server');
    */
    await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(client => {
        console.log('Mongo Connected!');
        const db = client.db('myApp');
        const collection = db.collection('images');
        app.locals.imageCollection = collection;
      })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/*
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
});
*/
// AWS Credentials
const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
});
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY


const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: 'nft-bucket-pile',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      console.log(file);
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    }
  })
});

const outdirectory = 'public';

app.use(express.static('public'))
app.use(bodyParser.json()); 



app.post('/api/v1/upload', upload.single('image'), async (req, res) => {
  const imageCollection = await req.app.locals.imageCollection;
  const uploadedFile = await req.file.location;
  console.log(req.file);

  imageCollection.insert({ filePath: uploadedFile })
    .then(result => {
      return res.json({ status: 'OK', ...result });
    })
  console.log("file uploaded successfully")
});


//use by upload form
/*
app.post('/upload', upload.array('upl', 25), function (req, res, next) {
  res.send({
    message: "Uploaded!",
    urls: req.files.map(function (file) {
      return { url: file.location, name: file.key, type: file.mimetype, size: file.size };
    })
  });
});
*/

app.get('/images', (req, res) => {
  const imageCollection = req.app.locals.imageCollection;
  imageCollection.find({})
    .toArray()
    .then(images => {
      const paths = images.map(({ filePath }) => ({ filePath }));
      res.json(paths);
    });
}); 



//clear out any old JS or CSS
fs.readdir(outdirectory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (
      file.endsWith('.js') ||
      file.endsWith('.css') ||
      file.endsWith('.js.map')
    ) {
      fs.unlink(path.join(outdirectory, file), (err) => {
        if (err) throw err;
      });
    }
  }
});

async function dev() {
  console.log('Building development bundle ⏳');
  await esbuild.build({
    entryPoints: ['src/index.js'],
    outdir: outdirectory,
    bundle: true,
    define: {
      'process.env.NODE_ENV': '"development"',
      global: 'global',
      process: 'process',
      Buffer: 'Buffer',
    },
    minify: false,
    watch: true,
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    plugins: [plugin(stdLibBrowser)],
    loader: {
      '.js': 'jsx',
    },
  });
  console.log('Development bundle built ✅');
  console.log('Running server from: http://localhost:8000');
  run().catch(console.dir);
  await servor({
    browser: true,
    root: outdirectory,
    port: 8000,
  });
}

async function prod() {
  console.log('Build started ⏳');
  await esbuild.build({
    entryPoints: ['src/index.js'],
    outdir: outdirectory,
    bundle: true,
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'global',
      process: 'process',
      Buffer: 'Buffer',
    },
    minify: true,
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    plugins: [plugin(stdLibBrowser)],
    loader: {
      '.js': 'jsx',
    },
  });
  console.log('Build completed ✅');
}

//defaults to build
let config = '-build';
if (process.argv.length > 2) {
  config = process.argv[2];
}

// Builds the bundle for dvelopment and runs a local web server 
// with livereload when -watch is set
config === '-watch' && dev();

// Builds optimized bundle for production
config === '-build' && prod();