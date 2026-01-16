import 'reflect-metadata'
import { Elysia } from 'elysia'
import { AppDataSource } from './config/database'
import { folderRoutes } from './presentation/routes/folder.routes'

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully')
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  })

const app = new Elysia()
  .get('/', () => ({ message: 'Hello from Infokes API' }))
  .get('/health', () => ({
    status: 'ok',
    database: AppDataSource.isInitialized ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  }))
  .use(folderRoutes)
  .listen(process.env.PORT || 3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
