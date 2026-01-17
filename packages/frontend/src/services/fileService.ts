import { api } from './api'
import type { File } from '@/types/folder'

interface FileDetailApiResponse {
    id: string
    name: string
    type: 'file'
    size?: number
    mimeType?: string
    folderId?: string
    createdAt: string
    updatedAt: string
}

function mapApiResponseToFile(data: FileDetailApiResponse): File {
    return {
        id: data.id,
        name: data.name,
        type: 'file',
        size: data.size,
        mimeType: data.mimeType,
        parentId: data.folderId,
    }
}

export const fileService = {
    /**
     * Get file details by ID
     */
    async getFileById(fileId: string): Promise<File> {
        const response = await api.get<{ data: FileDetailApiResponse }>(`/api/files/${fileId}`)
        return mapApiResponseToFile(response.data)
    },
}
