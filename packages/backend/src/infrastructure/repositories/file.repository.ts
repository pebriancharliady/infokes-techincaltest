import { AppDataSource } from '../../config/database'
import { File } from '../../entities/File'

export class FileRepository {
  private fileRepo = AppDataSource.getRepository(File)

  async findById(id: string): Promise<File | null> {
    return this.fileRepo.findOne({ where: { id } })
  }
}
