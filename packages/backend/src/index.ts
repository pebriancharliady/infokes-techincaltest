import 'reflect-metadata'
import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { AppDataSource } from './config/database'
import { folderRoutes } from './presentation/routes/folder.routes'
import { fileRoutes } from './presentation/routes/file.routes'

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('database connected successfully')
  })
  .catch((error) => {
    console.error('database connection failed:', error)
    process.exit(1)
  })

const app = new Elysia()
  .use(cors({
    origin: true, // Allow all origins in development, or use specific origin in production
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  .get('/', () => ({ message: 'Hello from Infokes API' }))
  .get('/health', () => ({
    status: 'ok',
    database: AppDataSource.isInitialized ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  }))
  .use(folderRoutes)
  .use(fileRoutes)
  .listen(process.env.PORT || 3001)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
