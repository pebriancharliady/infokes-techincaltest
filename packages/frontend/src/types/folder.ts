export interface File {
  id: string
  name: string
  type: 'file'
  parentId?: string
  size?: number
  mimeType?: string
}

export interface Folder {
  id: string
  name: string
  type: 'folder'
  children: FolderItem[]
  parentId?: string
  childrenCount?: number
}

export type FolderItem = Folder | File

export function isFile(item: FolderItem): item is File {
  return item.type === 'file'
}

export function isFolder(item: FolderItem): item is Folder {
  return item.type === 'folder'
}