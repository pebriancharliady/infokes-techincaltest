export interface FolderDto {
  id: string
  name: string
  type: 'folder'
  childrenCount: number
  parentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface FileDto {
  id: string
  name: string
  type: 'file'
  parentId?: string
  size?: number
  mimeType?: string
  createdAt: Date
  updatedAt: Date
}

export type FolderItemDto = FolderDto | FileDto
