import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/bun'
import { recordsRoute } from './routes/records'
import { serve } from 'bun'

// Init app
const app = new Hono()
// Use logger
app.use('*', logger())

// Routes
const apiRoutes = app.basePath('/api').route('/records', recordsRoute)

export default app
export type ApiRoutes = typeof apiRoutes
