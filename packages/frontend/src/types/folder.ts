export interface File {
    id: string
    name: string
    type: 'file'
    parentId?: string
}

export interface Folder {
    id: string
    name: string
    type: 'folder'
    children: (Folder | File)[]
    parentId?: string
}

export type FolderItem = Folder | File

// Mock data for development - will be replaced by API call
export const mockFolderData: Folder[] = [
    {
        id: '1',
        name: 'Documents',
        type: 'folder',
        children: [
            {
                id: '1-1',
                name: 'Work',
                type: 'folder',
                parentId: '1',
                children: [
                    { id: '1-1-1', name: 'Reports', type: 'folder', parentId: '1-1', children: [] },
                    { id: '1-1-2', name: 'Presentations', type: 'folder', parentId: '1-1', children: [] }
                ]
            },
            {
                id: '1-2',
                name: 'Personal',
                type: 'folder',
                parentId: '1',
                children: [
                    { id: '1-2-1', name: 'Photos', type: 'folder', parentId: '1-2', children: [] },
                    { id: '1-2-2', name: 'Videos', type: 'folder', parentId: '1-2', children: [] }
                ]
            }
        ]
    },
    {
        id: '2',
        name: 'Downloads',
        type: 'folder',
        children: [
            { id: '2-1', name: 'Software', type: 'folder', parentId: '2', children: [] },
            {
                id: '2-2', name: 'Music', type: 'folder', parentId: '2', children: [
                    { id: '2-2-1', name: 'Rock', type: 'file', parentId: '2-2' },
                ]
            }
        ]
    },
    {
        id: '3',
        name: 'Projects',
        type: 'folder',
        children: [
            {
                id: '3-1',
                name: 'Web Development',
                type: 'folder',
                parentId: '3',
                children: [
                    { id: '3-1-1', name: 'Frontend', type: 'folder', parentId: '3-1', children: [] },
                    {
                        id: '3-1-2', name: 'Backend', type: 'folder', parentId: '3-1', children: [
                            {
                                id: '3-1-2-1', name: 'Music', type: 'folder', parentId: '3-1-2', children: [
                                    {
                                        id: '3-1-2-1-1', name: 'APIs', type: 'folder', parentId: '3-1-2-1', children: [
                                            {
                                                id: '3-1-2-1-1-1', name: 'Node.js', type: 'folder', parentId: '3-1-2-1-1', children: [
                                                    {
                                                        id: '3-1-2-1-1-1-1', name: 'Express', type: 'folder', parentId: '3-1-2-1-1-1', children: [
                                                            {
                                                                id: '3-1-2-1-1-1-1-1', name: 'Middleware', type: 'folder', parentId: '3-1-2-1-1-1-1', children: [
                                                                    {
                                                                        id: '3-1-2-1-1-1-1-1-1', name: 'Auth', type: 'folder', parentId: '3-1-2-1-1-1-1-1', children: [
                                                                            { id: '3-1-2-1-1-1-1-1-1-1', name: 'OJKJSDKJSDKJKJKJSDKJKJ', type: 'folder', parentId: '3-1-2-1-1-1-1-1-1', children: [] }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    { id: '3-2', name: 'Mobile Apps', type: 'folder', parentId: '3', children: [] }
                ]
            }
        ]
    }
]
