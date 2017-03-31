import couchbase from 'couchbase'
import moment from 'moment'
import ottoman from 'ottoman'

const BUCKET_NAME = 'default'
const N1qlQuery = couchbase.N1qlQuery
const cluster = new couchbase.Cluster('couchbase://couchbase')
const bucket = cluster.openBucket(BUCKET_NAME)

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase)

const Comment = ottoman.model('Comment', {
  commentId: { type: 'string', auto: 'uuid', readonly: true },
  createdAt: { type: 'Date', default: moment.utc, readonly: true },
  text: { type: 'string' },
  fingerprint: { type: 'string' }
})

Comment.createAndSave = Promise.promisify(function(fingerprint, text, done) {
  this.create({
    fingerprint,
    text
  }, done)
})

Comment.getRecent = Promise.promisify(function(limit, done) {
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

ottoman.ensureIndices((err) => {
  if (err) {
    console.log(err)
  }
})

export default Comment
