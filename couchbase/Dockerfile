FROM couchbase:community-4.5.0

# FIXME initialize couchbase https://developer.couchbase.com/documentation/server/4.5/install/init-setup.html
# # Setup Administrator username and password
# RUN curl -v -X POST \
#       http://localhost:8091/settings/web \
#       -d 'username=USER' \
#       -d 'password=PASSWORD'
#
# # Initialize Node
#
# RUN curl -u 'username=USER&password=PASSWORD' -v -X POST \
#       http://localhost:8091/node/controller/setupServices \
#       -d 'services[]=data' \
#       -d 'services[]=index' \
#       -d 'services[]=query'
#
# RUN curl -u 'username=USER&password=PASSWORD' -X POST \
#       http://localhost:8091/pools/default \
#       -d 'memoryQuota=1024' \
#       -d 'indexMemoryQuota=512' \
#
# RUN curl -v -X POST \
#       http://localhost:8091/pools/default/buckets \
#       -d 'ramQuotaMB=896'
