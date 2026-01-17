import { ref, computed, type InjectionKey, type Ref, type ComputedRef } from 'vue'
import type { Folder, FolderItem, File } from '@/types/folder'
import { folderService } from '@/services/folderService'
import { fileService } from '@/services/fileService'

export interface FolderStore {
  folders: Ref<Folder[]>
  selectedFolder: Ref<Folder | undefined>
  selectedFile: Ref<File | undefined>
  searchQuery: Ref<string>
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
}

export const FOLDER_STORE_KEY: InjectionKey<FolderStore> = Symbol('folderStore')

export function useFolderStore(): FolderStore {
  const folders = ref<Folder[]>([])
  const selectedFolder = ref<Folder | undefined>(undefined)
  const selectedFile = ref<File | undefined>(undefined)
  const searchQuery = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const selectedFolderId = computed(() => selectedFolder.value?.id)
  const selectedFolderChildren = computed(() => selectedFolder.value?.children ?? [])

  const fetchRootFolders = async () => {
    isLoading.value = true
    error.value = null

    try {
      folders.value = await folderService.getRootFolders()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch folders'
    } finally {
      isLoading.value = false
    }
  }

  const fetchFolderChildren = async (folder: Folder) => {
    if (folder.children.length > 0) {
      return
    }

    if (folder.hasChildren === false) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const children = await folderService.getFolderChildren(folder.id)
      folder.children = children
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch folder children'
    } finally {
      isLoading.value = false
    }
  }

  const selectFolder = async (folder: Folder) => {
    selectedFolder.value = folder
    selectedFile.value = undefined


    if (folder.children.length === 0 && folder.hasChildren !== false) {
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
      error.value = e instanceof Error ? e.message : 'Failed to fetch file details'
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

  return {
    folders,
    selectedFolder,
    selectedFile,
    searchQuery,
    isLoading,
    error,

    selectedFolderId,
    selectedFolderChildren,

    fetchRootFolders,
    clearFileSelection,
    fetchFolderChildren,
    selectFolder,
    selectFile,
    clearSelection
  }
}
