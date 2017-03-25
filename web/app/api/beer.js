import couchbase from 'couchbase'
import uuid from 'uuid'

const cluster = new couchbase.Cluster('couchbase://couchbase')
const bucket = cluster.openBucket('beer-sample')
const N1qlQuery = couchbase.N1qlQuery

export function createComment(text) {
  return new Promise(function (resolve, reject) {
    bucket.insert(uuid(), { text }, function(err, doc) {
      if (err) {
        reject(err)
      }

      resolve(doc)
    })
  })
}

export function getComments(limit) {
  return new Promise(function (resolve, reject) {
    bucket.query(
      N1qlQuery.fromString(`SELECT * FROM \`beer-sample\` LIMIT ${limit}`), function(err, rows) {
        if (err) {
          reject(err)
        }

        resolve(rows)
      })
  })
}
