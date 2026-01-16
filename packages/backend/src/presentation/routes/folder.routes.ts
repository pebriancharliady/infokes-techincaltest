import { Elysia } from 'elysia'
import { FolderController } from '../controllers/folder.controller'

const folderController = new FolderController()

export const folderRoutes = new Elysia({ prefix: '/api/folders' })
  .get('/', async () => {
    return folderController.getRootFolders()
  })
  .get('/:id', async ({ params, set }) => {
    const result = await folderController.getFolderById(params.id)
    if ('error' in result) {
      set.status = result.status
      return { error: result.error }
    }
    return result
  })
  .get('/:id/children', async ({ params, set }) => {
    const result = await folderController.getFolderChildren(params.id)
    if ('error' in result) {
      set.status = result.status
      return { error: result.error }
    }
    return result
  })
