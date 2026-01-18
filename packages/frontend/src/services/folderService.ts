import { api } from './api'
import type { Folder, File, FolderItem } from '@/types/folder'

interface FolderApiResponse {
    id: string
    name: string
    type: 'folder'
    childrenCount: number
    parentId?: string
    createdAt: string
    updatedAt: string
}

interface FileApiResponse {
    id: string
    name: string
    type: 'file'
    parentId?: string
    size?: number
    mimeType?: string
    createdAt: string
    updatedAt: string
}

type FolderItemApiResponse = FolderApiResponse | FileApiResponse

function mapApiResponseToFolderItem(item: FolderItemApiResponse): FolderItem {
    if (item.type === 'file') {
        return {
            id: item.id,
            name: item.name,
            type: 'file',
            parentId: item.parentId,
            size: item.size,
            mimeType: item.mimeType,
        } as File
    }

    return {
        id: item.id,
        name: item.name,
        type: 'folder',
        children: [],
        parentId: item.parentId,
        childrenCount: item.childrenCount,
    } as Folder
}

export const folderService = {
    async getRootFolders(): Promise<Folder[]> {
        const response = await api.get<{ data: FolderApiResponse[] }>('/api/folders')
        return response.data.map(item => mapApiResponseToFolderItem(item) as Folder)
    },
    async getFolderChildren(folderId: string): Promise<FolderItem[]> {
        const response = await api.get<{ data: FolderItemApiResponse[] }>(`/api/folders/${folderId}/children`)
        return response.data.map(mapApiResponseToFolderItem)
    },
    async getFolderWithChildren(folderId: string): Promise<Folder> {
        const children = await this.getFolderChildren(folderId)

        return {
            id: folderId,
            name: '',
            type: 'folder',
            children,
        }
    },
}
