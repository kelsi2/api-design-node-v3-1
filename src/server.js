import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
  console.log('logging')
  next()
}

app.use(log)

router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

// This registers the router as middleware, need to go to /api/me, not just /me
app.use('/api', router)

// CRUD
// If you follow rest the routes should always be get (all), get /:id (get one), put /:id (edit), post (create), delete /:id -> 5 methods but only 2 routes (all and /:id)

// This makes it easy to do something like this and pass controllers and middleware as below:
router
  .route('/cat')
  .get()
  .post()

router
  .route('/cat/:id')
  .get()
  .put()
  .delete()

app.get('/', (req, res, next) => {
  // res.send({ message: 'Hello' })
  next()
})

app.get('/', (req, res) => {
  res.send({ data: [1, 2, 3] })
})

// Put and post are the same, both send data to the server
app.put('/data', (req, res) => {
  console.log(res)
})

app.delete('/data', (req, res) => {
  console.log(res)
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.post('/data', (req, res) => {
  console.log(req.body)
  res.send({ ok: true })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
