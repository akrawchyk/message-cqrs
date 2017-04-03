import Kafka from 'node-rdkafka'

const KAFKA_CLIENT = 'web'
const KAFKA_DELIVERY_REPORT = true
const KAFKA_STREAM = 'commands'
const KAFKA_POLL_INTERVAL_MS = 100
const producer = new Kafka.Producer({
  'client.id': KAFKA_CLIENT, // Specifies an identifier to use to help trace activity in Kafka
  'metadata.broker.list': process.env.KAFKA_BROKER_LIST,
  'dr_cb': KAFKA_DELIVERY_REPORT// Specifies that we want a delivery-report event to be generated
})

// Note that getWriteStream will create a new stream on every call. You should try to cache the returned stream for a topic after the first call.
const writeStream = producer.getWriteStream(KAFKA_STREAM)

// Poll for events every KAFKA_POLL_INTERVAL_MS
producer.setPollInterval(KAFKA_POLL_INTERVAL_MS)

if (KAFKA_DELIVERY_REPORT) {
  producer.on('delivery-report', (err, report) => {
    // TODO use this for sync requests? expose to each event to listen for their
    //      event's delivery
    // TODO need to add uuids to events?

    // Report of delivery statistics here:
    if (err) {
      console.log('Kafka producer delivery error')
      console.log(err)
    }

    console.log('Kafka delivery-report')
    console.log(report)
  })
}

writeStream.on('error', (err) => {
  console.log('Kafka write stream error:')
  console.log(err)
})

class Event {
  constructor(message) {
    this.queuedSuccess = writeStream.write(new Buffer(JSON.stringify(message)))

    if (!this.queuedSuccess) {
      console.log('Kafka stream write warning, too many messages in our queue already')
    }
  }
}

export default Event
