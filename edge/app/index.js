import Kafka from 'node-rdkafka'
import couchbase from 'couchbase'
import moment from 'moment'
import ottoman from 'ottoman'

const BUCKET_NAME = 'default'
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

ottoman.ensureIndices((err) => {
  if (err) {
    console.log(err)
  }
})


const consumer = new Kafka.KafkaConsumer({
  'group.id': 'edge',
  'metadata.broker.list': 'kafka:9092',
}, {})

const readStream = consumer.getReadStream('commands')

readStream.on('data', async function(data) {
  console.log('Kafka consumer got message')
  console.log(data)

  const value = JSON.parse(data.value.toString())
  console.log(value)
  const comment = await Comment.createAndSave(value.fingerprint, value.text)
  console.log(comment)
})
