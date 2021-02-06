// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SentryInitialize } from '@/libs/sentry'

SentryInitialize()

const doAsyncWork = () => Promise.reject(new Error('API Test 1'))
doAsyncWork()

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
