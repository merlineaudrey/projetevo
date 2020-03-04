const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'public')));

// app.use('/static',express.static('monDossier'));
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine' , 'pug');
app.get('/', (req, res) => res.render('index'));
app.get('/inscription', (req, res) => res.render('inscription')); 


mongoose.connect('mongodb://merline:mmadeleine1@cluster0-shard-00-00-xleua.mongodb.net:27017,cluster0-shard-00-01-xleua.mongodb.net:27017,cluster0-shard-00-02-xleua.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  console.log('nous somme connectés')
});


(require('./routes'))(app)

app.listen(port, () => {console.log(`Example app listening on port!`)
console.log(path.join(__dirname,'public'))});