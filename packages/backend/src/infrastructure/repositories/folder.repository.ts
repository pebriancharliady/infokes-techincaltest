import { AppDataSource } from '../../config/database'
import { Folder } from '../../entities/Folder'
import { File } from '../../entities/File'

export class FolderRepository {
  private folderRepo = AppDataSource.getRepository(Folder)
  private fileRepo = AppDataSource.getRepository(File)

  async findRootFolders(): Promise<Folder[]> {
    return this.folderRepo.find({
      where: { parentId: undefined },
      order: { name: 'ASC' }
    })
  }

  async findById(id: string): Promise<Folder | null> {
    return this.folderRepo.findOne({ where: { id } })
  }

  async findChildFolders(parentId: string): Promise<Folder[]> {
    return this.folderRepo.find({
      where: { parentId },
      order: { name: 'ASC' }
    })
  }

  async findChildFiles(folderId: string): Promise<File[]> {
    return this.fileRepo.find({
      where: { folderId },
      order: { name: 'ASC' }
    })
  }

  async hasChildren(folderId: string): Promise<boolean> {
    const folderCount = await this.folderRepo.count({ where: { parentId: folderId } })
    if (folderCount > 0) return true
    
    const fileCount = await this.fileRepo.count({ where: { folderId } })
    return fileCount > 0
  }
}
