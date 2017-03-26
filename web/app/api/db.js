import couchbase from 'couchbase-promises'
import uuid from 'uuid'

const BUCKET_NAME = 'default'
const COMMENT_ID_KEY = 'idCounterForComments'
const cluster = new couchbase.Cluster('couchbase://couchbase')
const bucket = cluster.openBucket(BUCKET_NAME)
const N1qlQuery = couchbase.N1qlQuery

export async function createComment(text='', timestamp=0) {
  try {
    const result = await bucket.counterAsync(COMMENT_ID_KEY, 1, { initial: 0 })
    const id = result.value
    return bucket.upsertMultiAsync({
      [uuid()]: {
        value: {
          text,
          timestamp,
          id
        }
      }
    })
  } catch (err) {
    // TODO return error
    console.log(err)
    throw new Error(`Unhandled: ${err.message}`)
  }
}

export function getComments(limit=9) {
  return bucket.queryAsync(
    N1qlQuery.fromString(`SELECT text, id FROM \`${BUCKET_NAME}\` WHERE text != '' LIMIT ${limit}`)
  )
}
