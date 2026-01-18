import { FileRepository } from '../../infrastructure/repositories/file.repository'
import type { FileDto } from '../dto/folder.dto'

export class FileService {
  private fileRepository: FileRepository

  constructor() {
    this.fileRepository = new FileRepository()
  }

  async getFileById(id: string): Promise<FileDto | null> {
    const file = await this.fileRepository.findById(id)
    if (!file) return null

    return {
      id: file.id,
      name: file.name,
      type: 'file',
      size: file.size,
      mimeType: file.mimeType,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt
    }
  }
}
