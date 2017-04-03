import Kafka from 'node-rdkafka'
import couchbase from 'couchbase'
import moment from 'moment'
import ottoman from 'ottoman'

// Store config

const BUCKET_NAME = 'default'
const cluster = new couchbase.Cluster('couchbase://couchbase')
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

// Incoming event stream config

// TODO after current comment offset, implement startup initialization from
//      current offset pointer to kafka latest

const KAFKA_GROUP = 'edge'
const KAFKA_STREAM = 'commands'
const consumer = new Kafka.KafkaConsumer({
  'group.id': KAFKA_GROUP,
  'metadata.broker.list': process.env.KAFKA_BROKER_LIST
}, {})

const readStream = consumer.getReadStream(KAFKA_STREAM)

readStream.on('data', async function(data) {
  console.log('Kafka consumer got message')
  console.log('raw data:', data)

  // TODO current comment stream offset tracking, can store that in couchbase as counter
  //      see: https://forums.couchbase.com/t/how-to-set-an-auto-increment-id/4892/2

  const value = JSON.parse(data.value.toString())
  console.log('parsed value', value)

  try {
    const comment = await Comment.createAndSave(value.fingerprint, value.text)
    console.log(comment)
  } catch (err) {
    console.log(err)
  }
})
