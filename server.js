const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3001

var app = express();

hbs.registerPartials(__dirname+'/views/partials/')

app.set('view engine', 'hbs')




app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}:${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append');
    }
  })
  console.log(log);

  next()
})

// app.use((req, res, next) => {
//   res.render('maint.hbs')
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/',(request, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'welcome Message'
  })
})
app.get('/about',(request, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})


app.get('/bad', (request, res) => {
  res.send('Bad Request')
})



app.listen(port, () => {
  console.log('Server is up on port: ',port);
})
