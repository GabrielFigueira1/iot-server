const express = require('express')
const path = require('path');;
const PORT = process.env.PORT || 5000

var lastTemp = 0;
var savedData = 0;

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'page.html'));
    })
  .post('/temp', (req, res) => {
    console.log(req.body)
    var data = JSON.stringify(req.body)
    data = JSON.parse(data);
    var temp = parseFloat(data.temp);
    lastTemp = temp;
    res.send("Dado armazenado:" + String(temp))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  