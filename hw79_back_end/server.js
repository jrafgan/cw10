const express = require('express');
const items = require('./app/items');
const categories = require('./app/categories');
const places = require('./app/places');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql      = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8003;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : '1qaz@WSX29',
  database : 'hw79_extra'
});

app.use('/items', items(connection));
app.use('/categories', categories(connection));
app.use('/places', places(connection));

connection.connect((err)=>{
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });

});


