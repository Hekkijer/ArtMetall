const express = require("express");
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient("mongodb://localhost:27017/");

 
const app = express();

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/gallery');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(express.static(__dirname));
app.post("/upload", multer({ storage: storageConfig }).array('files'), function(req, res, next) {

    let files = req.files;
    let type = req.body.type;

    if(!files || !type) res.send("Error with uploading file");

    else {

        //Adding to db
        async function run() {
            try {
                await client.connect();

                const db = client.db('ArtMetallDB');
                const gallery = db.collection('gallery');

                let idCounter = await gallery.estimatedDocumentCount();
                
                files.forEach((file) => {
                    idCounter++;
                    gallery.insertOne({ _id: idCounter, name: file.originalname, path: file.path, type: type });
                });

            }catch(err) {
                console.log(err)
            }
        }

        run();
        
        res.redirect('/admin')
    }
});

client.connect((err, client) => {

    const db = client.db('ArtMetallDB');
    const collection = db.collection('gallery');

    if (err) return console.log(err);

    collection.find().toArray((err, results) => {
        result = results[0];
        client.close;
    })
})

const jsonParser = express.json();

app.post('/app', jsonParser, (request, response) => {
    
    const type = request.body.type
    
    if(!type) return res.send("Error: line 73 app.js");

    else {

        // Get images for gallery
        async function getImages() {
            try {
                await client.connect();

                const db = client.db('ArtMetallDB');
                const gallery = db.collection('gallery');

                const images = await gallery.find({ type: type }).toArray();
    
                response.send(JSON.stringify(images))

            }catch(err) {
                console.log(err)
            }
        }

        getImages()
    }
})

app.use('/admin', (req, res) => {
    res.sendFile(__dirname + '/admin.html')
})

app.use("/", (request, response) => {
    response.sendFile(__dirname + request.url)
});

app.listen(3002);