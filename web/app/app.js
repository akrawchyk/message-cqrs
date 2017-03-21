import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import slashes from 'connect-slashes'
import api from './api/router'

const app = express()

app.enable('strict routing')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(slashes())

app.use('/api', api)

app.get('/', function (req, res) {
  res.send('Hello disqus-clone\n')
})

export default app
