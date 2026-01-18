import { IsNull } from 'typeorm'
import { AppDataSource } from '../../config/database'
import { Folder } from '../../entities/Folder'
import { File } from '../../entities/File'

export class FolderRepository {
  private folderRepo = AppDataSource.getRepository(Folder)
  private fileRepo = AppDataSource.getRepository(File)

  async findRootFolders(): Promise<Folder[]> {
    return this.folderRepo.find({
      where: { parentId: IsNull() },
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

  async getChildrenCount(folderId: string): Promise<number> {
    const folderCount = await this.folderRepo.count({ where: { parentId: folderId } })
    const fileCount = await this.fileRepo.count({ where: { folderId } })
    return folderCount + fileCount
  }
}
