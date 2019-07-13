const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dev_url = "mongodb://odewumi:Pelumi2@ds349587.mlab.com:49587/bucketlist"
const pathway = require('./route/mainroute')
const app = express();
const path = require('path');


const mongodb = process.env.MONGO_DB || dev_url;

mongoose.connect(mongodb)

mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('Error', console.log.bind(console,'MongoDB Error'))

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api/v1',pathway)

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));
    app.get('*' ,(req, res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


const port = process.env.PORT || 5000

app.listen(port || 5000,()=>{
	console.log('App Listens on port'+port);
})


