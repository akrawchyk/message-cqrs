import couchbase from 'couchbase'
import uuid from 'uuid'

const cluster = new couchbase.Cluster('couchbase://couchbase')
const bucket = cluster.openBucket('default')

export async function createComment(text) {
  return new Promise(function(resolve, reject) {
    bucket.insert(uuid(), { text }, function(err, doc) {
      if (err) {
        reject(err)
      }

      resolve({
        data: 'success'
      })
    })
  })
}
