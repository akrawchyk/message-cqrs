import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createComment, getComments } from './beer'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(cors())

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function query(req, res, next) {
  await timeout(1000)

  const limit = req.query.limit || 10

  try {
    const comments = await getComments(limit)
    res.json({
      'status': 'success',
      comments
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}

async function command(req, res, next) {
  await timeout(1000)

  const text = req.body.text || ''

  try {
    const doc = await createComment(text)
    res.json({
      status: 'success',
      doc
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}

router
  .get('/query', query)
  .post('/command', urlencodedParser, command)

export default router
