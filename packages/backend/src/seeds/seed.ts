import 'reflect-metadata'
import { AppDataSource } from '../config/database'
import { Folder } from '../entities/Folder'
import { File } from '../entities/File'

const seedData = async () => {
  try {
    await AppDataSource.initialize()
    console.log('database connected')

    const folderRepo = AppDataSource.getRepository(Folder)
    const fileRepo = AppDataSource.getRepository(File)

    await fileRepo.createQueryBuilder().delete().from(File).execute()
    await folderRepo.createQueryBuilder().delete().from(Folder).execute()

    const documents = folderRepo.create({ name: 'Documents' })
    const downloads = folderRepo.create({ name: 'Downloads' })
    const projects = folderRepo.create({ name: 'Projects' })
    
    await folderRepo.save([documents, downloads, projects])

    const work = folderRepo.create({ name: 'Work', parentId: documents.id })
    const personal = folderRepo.create({ name: 'Personal', parentId: documents.id })
    await folderRepo.save([work, personal])

    const reports = folderRepo.create({ name: 'Reports', parentId: work.id })
    const presentations = folderRepo.create({ name: 'Presentations', parentId: work.id })
    await folderRepo.save([reports, presentations])

    const photos = folderRepo.create({ name: 'Photos', parentId: personal.id })
    const videos = folderRepo.create({ name: 'Videos', parentId: personal.id })
    await folderRepo.save([photos, videos])

    const software = folderRepo.create({ name: 'Software', parentId: downloads.id })
    const music = folderRepo.create({ name: 'Music', parentId: downloads.id })
    await folderRepo.save([software, music])

    const webDev = folderRepo.create({ name: 'Web Development', parentId: projects.id })
    const mobileApps = folderRepo.create({ name: 'Mobile Apps', parentId: projects.id })
    await folderRepo.save([webDev, mobileApps])

    const frontend = folderRepo.create({ name: 'Frontend', parentId: webDev.id })
    const backend = folderRepo.create({ name: 'Backend', parentId: webDev.id })
    await folderRepo.save([frontend, backend])

    const apis = folderRepo.create({ name: 'APIs', parentId: backend.id })
    await folderRepo.save(apis)

    const nodejs = folderRepo.create({ name: 'Node.js', parentId: apis.id })
    await folderRepo.save(nodejs)

    const express = folderRepo.create({ name: 'Express', parentId: nodejs.id })
    await folderRepo.save(express)

    const middleware = folderRepo.create({ name: 'Middleware', parentId: express.id })
    await folderRepo.save(middleware)

    const files = [
      fileRepo.create({ name: 'Q4 Report.pdf', folderId: reports.id, size: 1024000, mimeType: 'application/pdf' }),
      fileRepo.create({ name: 'Annual Summary.docx', folderId: reports.id, size: 512000, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
      fileRepo.create({ name: 'Team Meeting.pptx', folderId: presentations.id, size: 2048000, mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }),
      fileRepo.create({ name: 'vacation.jpg', folderId: photos.id, size: 3500000, mimeType: 'image/jpeg' }),
      fileRepo.create({ name: 'birthday.mp4', folderId: videos.id, size: 50000000, mimeType: 'video/mp4' }),
      fileRepo.create({ name: 'installer.exe', folderId: software.id, size: 15000000, mimeType: 'application/x-msdownload' }),
      fileRepo.create({ name: 'song.mp3', folderId: music.id, size: 4500000, mimeType: 'audio/mpeg' }),
      fileRepo.create({ name: 'rock_album.zip', folderId: music.id, size: 80000000, mimeType: 'application/zip' }),
      fileRepo.create({ name: 'index.html', folderId: frontend.id, size: 2048, mimeType: 'text/html' }),
      fileRepo.create({ name: 'styles.css', folderId: frontend.id, size: 4096, mimeType: 'text/css' }),
      fileRepo.create({ name: 'app.ts', folderId: frontend.id, size: 8192, mimeType: 'text/typescript' }),
      fileRepo.create({ name: 'server.ts', folderId: backend.id, size: 6144, mimeType: 'text/typescript' }),
      fileRepo.create({ name: 'auth.ts', folderId: middleware.id, size: 3072, mimeType: 'text/typescript' }),
      fileRepo.create({ name: 'README.md', folderId: projects.id, size: 1024, mimeType: 'text/markdown' }),
    ]

    await fileRepo.save(files)

    await AppDataSource.destroy()
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seedData()
