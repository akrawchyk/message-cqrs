import express from 'express'
import bodyParser from 'body-parser'
import couchbase from 'couchbase'
import moment from 'moment'
import Event from './events'

const BUCKET_NAME = 'default'
const N1qlQuery = couchbase.N1qlQuery
const cluster = new couchbase.Cluster('couchbase://couchbase')
const bucket = cluster.openBucket(BUCKET_NAME)
const getRecentComments = Promise.promisify(function(limit, done) {
  const past24Hours = moment.utc().subtract(1, 'days')
  const now = moment.utc()
  bucket.query(
    N1qlQuery.fromString(
      `SELECT * FROM ${BUCKET_NAME}
        WHERE STR_TO_MILLIS(${BUCKET_NAME}.createdAt)
          BETWEEN STR_TO_MILLIS($1) AND STR_TO_MILLIS($2)
        ORDER BY createdAt DESC
        LIMIT ${limit}`
    ),
    [past24Hours.format(), now.format()],
    done
  )
})

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function query(req, res, next) {
  await timeout(1000)

  const limit = req.query.limit

  try {
    const data = await getRecentComments(limit)
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
    const queuedSuccess = new Event({
      type: 'CREATE_COMMENT',
      fingerprint,
      text
    })

    // TODO this is async now, use delivery-report event to send sync success/fail
    //      async will move to websockets only?
    res.status(202).json({
      status: '202',
      data: queuedSuccess
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
