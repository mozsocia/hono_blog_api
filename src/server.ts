// server.ts - src/server.ts
import { serve } from '@hono/node-server'
import app from './index'

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})