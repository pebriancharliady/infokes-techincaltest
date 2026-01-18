import { ref, computed, type InjectionKey, type Ref, type ComputedRef } from 'vue'
import type { Folder, FolderItem, File } from '@/types/folder'
import { folderService } from '@/services/folderService'
import { fileService } from '@/services/fileService'

export interface FolderStore {
  folders: Ref<Folder[]>
  selectedFolder: Ref<Folder | undefined>
  selectedFile: Ref<File | undefined>
  expandedFolderIds: Ref<Set<string>>
  loadingFolderIds: Ref<Set<string>>
  isLoading: Ref<boolean>
  error: Ref<string | null>

  selectedFolderId: ComputedRef<string | undefined>
  selectedFolderChildren: ComputedRef<FolderItem[]>

  fetchRootFolders: () => Promise<void>
  fetchFolderChildren: (folder: Folder) => Promise<void>
  selectFolder: (folder: Folder) => Promise<void>
  selectFile: (file: File) => Promise<void>
  clearSelection: () => void
  clearFileSelection: () => void
  expandFolder: (folderId: string) => void
  collapseFolder: (folderId: string) => void
  toggleFolder: (folderId: string) => void
  toggleFolderExpansion: (folder: Folder) => Promise<void>
  isFolderExpanded: (folderId: string) => boolean
  isFolderLoading: (folderId: string) => boolean
  expandPathToFolder: (targetFolder: Folder) => Promise<void>
  expandPathToFile: (file: File) => Promise<void>
  findFolderInTree: (folderId: string, tree?: Folder[]) => Folder | undefined
  selectFolderFromGrid: (folder: Folder) => Promise<void>
  selectFileFromGrid: (file: File) => Promise<void>
}

export const FOLDER_STORE_KEY: InjectionKey<FolderStore> = Symbol('folderStore')

export function useFolderStore(): FolderStore {
  const folders = ref<Folder[]>([])
  const selectedFolder = ref<Folder | undefined>(undefined)
  const selectedFile = ref<File | undefined>(undefined)
  const expandedFolderIds = ref<Set<string>>(new Set())
  const loadingFolderIds = ref<Set<string>>(new Set())
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const selectedFolderId = computed(() => selectedFolder.value?.id)
  const selectedFolderChildren = computed(() => selectedFolder.value?.children ?? [])

  const findFolderInTree = (folderId: string, tree?: Folder[]): Folder | undefined => {
    const searchTree = tree ?? folders.value
    for (const folder of searchTree) {
      if (folder.id === folderId) return folder
      if (folder.children.length > 0) {
        const childFolders = folder.children.filter((c): c is Folder => c.type === 'folder')
        const found = findFolderInTree(folderId, childFolders)
        if (found) return found
      }
    }
    return undefined
  }

  const findPathToFolder = (folderId: string, tree?: Folder[], currentPath: string[] = []): string[] | null => {
    const searchTree = tree ?? folders.value
    for (const folder of searchTree) {
      const newPath = [...currentPath, folder.id]
      if (folder.id === folderId) return newPath
      if (folder.children.length > 0) {
        const childFolders = folder.children.filter((c): c is Folder => c.type === 'folder')
        const found = findPathToFolder(folderId, childFolders, newPath)
        if (found) return found
      }
    }
    return null
  }

  const fetchRootFolders = async () => {
    isLoading.value = true
    error.value = null

    try {
      folders.value = await folderService.getRootFolders()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error'
    } finally {
      isLoading.value = false
    }
  }

  const fetchFolderChildren = async (folder: Folder) => {
    if (folder.children.length > 0) {
      return
    }

    if (folder.childrenCount === 0) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const children = await folderService.getFolderChildren(folder.id)
      folder.children = children
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error'
    } finally {
      isLoading.value = false
    }
  }

  const selectFolder = async (folder: Folder) => {
    selectedFolder.value = folder
    selectedFile.value = undefined

    if (folder.children.length === 0 && folder.childrenCount !== 0) {
      await fetchFolderChildren(folder)
    }
  }

  const selectFile = async (file: File) => {
    isLoading.value = true
    error.value = null

    try {
      const fileDetails = await fileService.getFileById(file.id)
      selectedFile.value = fileDetails
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error'
    } finally {
      isLoading.value = false
    }
  }

  const clearSelection = () => {
    selectedFolder.value = undefined
    selectedFile.value = undefined
  }

  const clearFileSelection = () => {
    selectedFile.value = undefined
  }

  const expandFolder = (folderId: string) => {
    expandedFolderIds.value = new Set([...expandedFolderIds.value, folderId])
  }

  const collapseFolder = (folderId: string) => {
    const newSet = new Set(expandedFolderIds.value)
    newSet.delete(folderId)
    expandedFolderIds.value = newSet
  }

  const toggleFolder = (folderId: string) => {
    if (expandedFolderIds.value.has(folderId)) {
      collapseFolder(folderId)
    } else {
      expandFolder(folderId)
    }
  }

  const isFolderExpanded = (folderId: string): boolean => {
    return expandedFolderIds.value.has(folderId)
  }

  const isFolderLoading = (folderId: string): boolean => {
    return loadingFolderIds.value.has(folderId)
  }

  const setFolderLoading = (folderId: string, loading: boolean) => {
    const newSet = new Set(loadingFolderIds.value)
    if (loading) {
      newSet.add(folderId)
    } else {
      newSet.delete(folderId)
    }
    loadingFolderIds.value = newSet
  }

  const toggleFolderExpansion = async (folder: Folder) => {
    if (isFolderExpanded(folder.id)) {
      collapseFolder(folder.id)
      return
    }

    if (folder.children.length === 0 && folder.childrenCount && folder.childrenCount > 0) {
      setFolderLoading(folder.id, true)
      await fetchFolderChildren(folder)
      setFolderLoading(folder.id, false)
    }

    expandFolder(folder.id)
  }

  const expandPathToFolder = async (targetFolder: Folder) => {
    const path = findPathToFolder(targetFolder.id)
    if (!path) return

    for (let i = 0; i < path.length - 1; i++) {
      const folderId = path[i]
      const folder = findFolderInTree(folderId!)
      if (folder) {
        if (folder.children.length === 0 && folder.childrenCount !== 0) {
          await fetchFolderChildren(folder)
        }
        expandFolder(folderId!)
      }
    }
  }

  const expandPathToFile = async (file: File) => {
    if (!file.parentId) return

    const parentFolder = findFolderInTree(file.parentId)
    if (parentFolder) {
      await expandPathToFolder(parentFolder)
      expandFolder(file.parentId)
      selectedFolder.value = parentFolder
      if (parentFolder.children.length === 0 && parentFolder.childrenCount !== 0) {
        await fetchFolderChildren(parentFolder)
      }
    }
  }

  const selectFolderFromGrid = async (folder: Folder) => {
    await selectFolder(folder)
    await expandPathToFolder(folder)
  }

  const selectFileFromGrid = async (file: File) => {
    await selectFile(file)
    await expandPathToFile(file)
  }

  return {
    folders,
    selectedFolder,
    selectedFile,
    expandedFolderIds,
    loadingFolderIds,
    isLoading,
    error,

    selectedFolderId,
    selectedFolderChildren,

    fetchRootFolders,
    fetchFolderChildren,
    selectFolder,
    selectFile,
    clearSelection,
    clearFileSelection,
    expandFolder,
    collapseFolder,
    toggleFolder,
    toggleFolderExpansion,
    isFolderExpanded,
    isFolderLoading,
    expandPathToFolder,
    expandPathToFile,
    findFolderInTree,
    selectFolderFromGrid,
    selectFileFromGrid,
  }
}
