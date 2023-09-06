import esbuild from 'esbuild';
import plugin  from 'node-stdlib-browser/helpers/esbuild/plugin';
import stdLibBrowser  from 'node-stdlib-browser';
import fs  from 'fs';
import path from 'path';
import servor from 'servor';
import multer  from 'multer';
// File Upload
import aws from 'aws-sdk';
import express from 'express';
import bodyParser from 'body-parser'
//import multerS3  from 'multer-s3';
//import uuid from ('uuid').v4;
import { MongoClient } from 'mongodb';
const app = express();
import 'dotenv/config';
var db;
/*
const storage = multer({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // or 
    // uuid, or fieldname
    cb(null, file.fieldname + uniqueSuffix);
  }
})  
*/

const uri = process.env.MONGODB_URI; // Create a new MongoClient
const client = new MongoClient(uri);

/*
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    
    await client.connect(); // Establish and verify connection
    await client.db('myAppDB').collection('images');
    app.locals.imageCollection = client.db('myAppDB').collection('images');
    console.log('Connected successfully to server');
    
    await MongoClient.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
     })
      .then(client => {
        console.log('Mongo Connected!');
        const db = client.db(process.env.MONGODB_BUCKET_NAME);
        const collection = db.collection('images');
        app.locals.imageCollection = collection;
      })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
*/

// AWS Credentials
const s3 = new aws.S3({
  apiVersion: '2012-10-17',
  secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-west-1'
});
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

/*
const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
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
*/

const outdirectory = 'public';

app.use(express.static('public'));
app.use(express.static('js'));
app.use(bodyParser.json()); 

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

const upload = multer({ dest: "uploads/"});

app.post('/upload', upload.single('image'), (req, res) => {
  /*
  const imageCollection = await req.app.locals.imageCollection;
  const uploadedFile = await req.file.location;
  */
  res.json({ status: "success"});  
  /*
  imageCollection.insert({ filePath: uploadedFile })
    .then(result => {
      return res.json({ status: 'OK', ...result });
    })
  */
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
/*
app.get('/images', (req, res) => {
  const imageCollection = req.app.locals.imageCollection;
  imageCollection.find({})
    .toArray()
    .then(images => {
      const paths = images.map(({ filePath }) => ({ filePath }));
      res.json(paths);
    });
}); 
*/


//clear out any old JS or CSS
/*
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
*/
/*
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
*/
app.listen(8000, () => console.log("App now running on localhost:8000"));

/*
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
*/
//defaults to build
/*
let config = '-build';
if (process.argv.length > 2) {
  config = process.argv[2];
}
*/
// Builds the bundle for dvelopment and runs a local web server 
// with livereload when -watch is set
//config === '-watch' && dev();

// Builds optimized bundle for production
//config === '-build' && prod();