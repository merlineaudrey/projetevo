const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
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


mongoose.connect('mongodb+srv://merline:mmadeleine1@cluster0-xleua.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('nous sommes connectés')
});
  // port
app.set('port', (process.env.PORT || 3000));

(require('./routes'))(app)

app.listen(port, () => {console.log(`Example app listening on port!`)
console.log(path.join(__dirname,'public'))});