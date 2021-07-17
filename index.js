const express = require('express')
const path = require('path');;
const PORT = process.env.PORT || 5000

var lastTemp = 0;
var lastDate = "23-32-we";

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'page.html'));
    })
  .get('/last', (req, res) =>{
    res.setHeader('Content-Type', 'text/html', 'charset=utf-8');
    console.log(lastDate);
    res.write("<p>Ultima temperatura: "+ String(lastTemp));
    res.write("</p><span>Medida em <span>" + String(lastDate));
    res.end();
  })
  .post('/temp', (req, res) => {
    console.log(req.body)
    var data = JSON.stringify(req.body)
    data = JSON.parse(data);
    var temp = parseFloat(data.temp);
    lastDate = data.date;
    res.send("Dado armazenado:" + String(temp))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  