import { Hono } from 'hono'
import blogRoutes from './routes/blogRoutes'

const app = new Hono()

app.route('/api/blog', blogRoutes)

// Add a simple root route
app.get('/', (c) => c.text('Hello Hono!'))

export default app