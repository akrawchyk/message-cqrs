import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', (req, res) => {
  res.send('Hello burger\n')
})

export { app as default }
