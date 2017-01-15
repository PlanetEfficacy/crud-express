const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://jspevack:8>RqLp(j)CHQh5rj@ds111589.mlab.com:11589/crud', (err, database) => {
  if (err) console.log(err)
  db = database
  app.listen(3000, () => {
    console.log(__dirname)
    console.log('listening on 3000')
  })

  app.use(bodyParser.urlencoded({extended: true}))

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {quotes: result})
    })
  })

  app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
    })
  })
})
