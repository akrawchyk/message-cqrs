import couchbase from 'couchbase'
import moment from 'moment'
import ottoman from 'ottoman'

// Store config

const BUCKET_NAME = 'default'
const cluster = new couchbase.Cluster('couchbase://couchbase/?detailed_errcodes=1')
const bucket = cluster.openBucket(BUCKET_NAME)

ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase)

// Model config

const Comment = ottoman.model('Comment', {
  commentId: { type: 'string', auto: 'uuid', readonly: true },
  createdAt: { type: 'Date', default: () => moment().toJSON(), readonly: true },
  fingerprint: { type: 'string', readonly: true },
  text: { type: 'string', readonly: true }
})

Comment.createAndSave = Promise.promisify(function(fingerprint, text, done) {
  this.create({
    fingerprint,
    text
  }, done)
})

ottoman.ensureIndices((err) => {
  if (err) {
    console.log(err)
  }
})


export {
  Comment
}
