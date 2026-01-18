import { FolderRepository } from '../../infrastructure/repositories/folder.repository'
import type { FolderDto, FileDto, FolderItemDto } from '../dto/folder.dto'

export class FolderService {
  private folderRepository: FolderRepository

  constructor() {
    this.folderRepository = new FolderRepository()
  }

  async getRootFolders(): Promise<FolderDto[]> {
    const folders = await this.folderRepository.findRootFolders()

    const result: FolderDto[] = await Promise.all(
      folders.map(async (folder) => ({
        id: folder.id,
        name: folder.name,
        type: 'folder' as const,
        childrenCount: await this.folderRepository.getChildrenCount(folder.id),
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt
      }))
    )
    return result
  }

  async getFolderById(id: string): Promise<FolderDto | null> {
    const folder = await this.folderRepository.findById(id)
    if (!folder) return null

    return {
      id: folder.id,
      name: folder.name,
      type: 'folder',
      childrenCount: await this.folderRepository.getChildrenCount(folder.id),
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt
    }
  }

  async getFolderChildren(folderId: string): Promise<FolderItemDto[]> {
    const folder = await this.folderRepository.findById(folderId)
    if (!folder) {
      throw new Error('Folder not found')
    }

    const childFolders = await this.folderRepository.findChildFolders(folderId)
    const folderDtos: FolderDto[] = await Promise.all(
      childFolders.map(async (f) => ({
        id: f.id,
        name: f.name,
        type: 'folder' as const,
        childrenCount: await this.folderRepository.getChildrenCount(f.id),
        parentId: folderId,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt
      }))
    )

    const childFiles = await this.folderRepository.findChildFiles(folderId)
    const fileDtos: FileDto[] = childFiles.map((f) => ({
      id: f.id,
      name: f.name,
      type: 'file' as const,
      parentId: folderId,
      size: f.size,
      mimeType: f.mimeType,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt
    }))

    return [...folderDtos, ...fileDtos]
  }
}
