import couchbase from 'couchbase'
import ottoman from 'ottoman'

const BUCKET_NAME = 'default'
const N1qlQuery = couchbase.N1qlQuery
const cluster = new couchbase.Cluster('couchbase://couchbase')
const bucket = cluster.openBucket(BUCKET_NAME)

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase)

const Comment = ottoman.model('Comment', {
  commentId: { type: 'string', auto: 'uuid', readonly: true },
  createdAt: { type: 'Date', default: function() {
    return (new Date()).toISOString()
  }},
  text: { type: 'string' },
  timestamp: { type: 'Date' }
})

Comment.createAndSave = Promise.promisify(function(text, timestamp, done) {
  this.create({
    text,
    timestamp
  }, done)
})

Comment.getRecent = Promise.promisify(function(limit, done) {
  const date = new Date()
  const now = date.toISOString()
  date.setDate(date.getDate() - 1)
  const past24Hours = date.toISOString()
  bucket.query(
    N1qlQuery.fromString(
      `SELECT * FROM ${BUCKET_NAME}
        WHERE STR_TO_MILLIS(${BUCKET_NAME}.createdAt)
          BETWEEN STR_TO_MILLIS($1) AND STR_TO_MILLIS($2)
        ORDER BY createdAt DESC
        LIMIT ${limit}`
    ),
    [past24Hours, now],
    done
  )
})

ottoman.ensureIndices((err) => {
  if (err) {
    console.log(err)
  }
})

export default Comment
