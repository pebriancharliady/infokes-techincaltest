import { FolderService } from '../../application/services/folder.service'

export class FolderController {
  private folderService: FolderService

  constructor() {
    this.folderService = new FolderService()
  }

  async getRootFolders() {
    try {
      const folders = await this.folderService.getRootFolders()
      return { data: folders }
    } catch (error) {
      console.error('Error fetching root folders:', error)
      throw error
    }
  }

  async getFolderById(id: string) {
    try {
      const folder = await this.folderService.getFolderById(id)
      if (!folder) {
        return { error: 'Folder not found', status: 404 }
      }
      return { data: folder }
    } catch (error) {
      console.error('Error fetching folder:', error)
      throw error
    }
  }

  async getFolderChildren(id: string) {
    try {
      const children = await this.folderService.getFolderChildren(id)
      return { data: children }
    } catch (error) {
      if (error instanceof Error && error.message === 'Folder not found') {
        return { error: 'Folder not found', status: 404 }
      }
      console.error('Error fetching folder children:', error)
      throw error
    }
  }
}
