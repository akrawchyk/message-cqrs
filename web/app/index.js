import app from './app'

const PORT = process.env.PORT

app.set('port', PORT)

const server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + server.address().port)
})
