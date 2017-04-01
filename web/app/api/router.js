import express from 'express'
import bodyParser from 'body-parser'
import Comment from './comments'
import Event from './events'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function query(req, res, next) {
  await timeout(1000)

  const limit = req.query.limit

  try {
    const data = await Comment.getRecent(limit)
    data = data.map((c) => {
      return c.default  // unwrap N1ql query
    })
    res.json({
      status: '200',
      data
    })
  } catch (err) {
    res.status(500).json({
      errors: [{
        status: '500',
        detail: err.message
      }]
    })
  }
}

async function command(req, res, next) {
  await timeout(1000)

  const fingerprint = req.body.fingerprint
  const text = req.body.text

  try {
    const e = new Event('message')

    const data = await Comment.createAndSave(fingerprint, text)
    res.status(201).json({
      status: '201',
      data
    })
  } catch (err) {
    res.status(500).json({
      errors: [{
        status: '500',
        detail: err.message
      }]
    })
  }
}

router
  .get('/query', query)
  .post('/command', urlencodedParser, command)

export default router
