import express from 'express'
import bodyParser from 'body-parser'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/query', function (req, res) {
  res.send('Hello from /query')
})

router.post('/command', urlencodedParser, function (req, res) {
  res.send('Hello from /command')
})

export default router
