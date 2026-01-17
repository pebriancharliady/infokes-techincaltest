import { Elysia } from 'elysia'
import { FileController } from '../controllers/file.controller'

const fileController = new FileController()

export const fileRoutes = new Elysia({ prefix: '/api/files' })
  .get('/:id', async ({ params, set }) => {
    const result = await fileController.getFileById(params.id)
    if ('error' in result) {
      set.status = result.status
      return { error: result.error }
    }
    return result
  })
