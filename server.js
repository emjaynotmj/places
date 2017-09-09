const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname + '/public/index.html'))
});

app.listen(PORT);
console.log(`App started on ${PORT}...`);