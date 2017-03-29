import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Comment from './comments.js'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(cors())

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function query(req, res, next) {
  await timeout(1000)

  const limit = req.query.limit

  try {
    const data = await Comment.getRecent(limit)
    res.json({
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

  const text = req.body.text
  const timestamp = req.body.timestamp

  try {
    const data = await Comment.createAndSave(text, timestamp)
    res.status(201).json({
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
