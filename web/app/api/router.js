import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createComment } from './beer'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(cors())

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// FIXME catch errors for ALL async functions

async function helloWorld(req, res, next) {
  await timeout(1000)
  res.json({
    success: 'true'
  })
}

async function command(req, res, next) {
  await timeout(1000)

  const body = req.body
  const text = body.text || ''

  // process incoming command
  try {
    const doc = await createComment(text)
    res.json(doc)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

router
  .get('/query', helloWorld)
  .post('/command', urlencodedParser, command)

export default router
