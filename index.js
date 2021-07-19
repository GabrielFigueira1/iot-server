const db = require('./dbconnection') 
const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const sch = require('./schemas')

const Temp = mongoose.model('Temp', sch.tempSchema);

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
  
  .get('/all', (req, res) =>{
    Temp.find().lean().exec(function (err, users) {
      return res.end(JSON.stringify(users));
  })
    })
  
  .get('/lastten', (req, res) =>{
    Temp.find().sort({ _id: -1 }).limit(10).exec(function (err, users) {
      return res.end(JSON.stringify(users));
  })
  })

  .get('/last', (req, res) =>{
    Temp.find().sort({ _id: -1 }).limit(1).exec(function (err, users) {
      return res.end(JSON.stringify(users));
  })
  })

  .post('/temp', (req, res) => {
    console.log(req.body)
    var data = JSON.stringify(req.body)
    data = JSON.parse(data);
    var temp = parseFloat(data.temperature);
    const newData = new Temp({temperature: temp, date: data.date});
    newData.save();
    res.send("Dado armazenado");
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  