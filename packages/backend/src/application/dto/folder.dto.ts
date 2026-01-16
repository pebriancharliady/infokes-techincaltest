export interface FolderDto {
  id: string
  name: string
  type: 'folder'
  hasChildren: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FileDto {
  id: string
  name: string
  type: 'file'
  hasChildren: false
  size?: number
  mimeType?: string
  createdAt: Date
  updatedAt: Date
}

export type FolderItemDto = FolderDto | FileDto
