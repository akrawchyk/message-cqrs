import Kafka from 'node-rdkafka'

const producer = new Kafka.Producer({
  'client.id': 'web', // Specifies an identifier to use to help trace activity in Kafka
  'metadata.broker.list': 'kafka:9092', // Connect to a Kafka instance on localhost
  'dr_cb': true // Specifies that we want a delivery-report event to be generated
})

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'web',
  'metadata.broker.list': 'kafka:9092',
}, {})

const readStream = consumer.getReadStream('commands')

readStream.on('data', data => {
  console.log('Kafka consumer got message')
  console.log(data)
})


// Note that getWriteStream will create a new stream on every call. You should try to cache the returned stream for a topic after the first call.
const writeStream = producer.getWriteStream('commands')

// Poll for events every 100 ms
producer.setPollInterval(100)

producer.on('delivery-report', (err, report) => {
  // Report of delivery statistics here:
  //
  if (err) {
    console.log('Kafka producer delivery error')
    console.log(err)
  }

  console.log('Kafka delivery-report')
  console.log(report)
})

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
