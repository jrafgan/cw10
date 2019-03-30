const express = require('express');
const news = require('./app/news');
const comments = require('./app/comments');
const cors = require('cors');
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
  database : 'cw10'
});

app.use('/news', news(connection));
app.use('/comments', comments(connection));

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