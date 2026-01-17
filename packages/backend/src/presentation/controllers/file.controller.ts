import { FileService } from '../../application/services/file.service'

export class FileController {
  private fileService: FileService

  constructor() {
    this.fileService = new FileService()
  }

  async getFileById(id: string) {
    try {
      const file = await this.fileService.getFileById(id)
      if (!file) {
        return { error: 'File not found', status: 404 }
      }
      return { data: file }
    } catch (error) {
      console.error('Error fetching file:', error)
      throw error
    }
  }
}
