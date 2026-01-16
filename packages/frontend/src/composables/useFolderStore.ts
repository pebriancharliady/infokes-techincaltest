import { ref, computed, type InjectionKey, type Ref, type ComputedRef } from 'vue'
import type { Folder } from '@/types/folder'

export interface FolderStore {
  folders: Ref<Folder[]>
  selectedFolder: Ref<Folder | undefined>
  searchQuery: Ref<string>
  
  selectedFolderId: ComputedRef<string | undefined>
  
  setFolders: (data: Folder[]) => void
  selectFolder: (folder: Folder) => void
  clearSelection: () => void
}

export const FOLDER_STORE_KEY: InjectionKey<FolderStore> = Symbol('folderStore')

export function useFolderStore(initialFolders: Folder[] = []): FolderStore {
  const folders = ref<Folder[]>(initialFolders)
  const selectedFolder = ref<Folder | undefined>(undefined)
  const searchQuery = ref('')
  
  const selectedFolderId = computed(() => selectedFolder.value?.id)
  
  const setFolders = (data: Folder[]) => {
    folders.value = data
  }
  
  const selectFolder = (folder: Folder) => {
    selectedFolder.value = folder
  }
  
  const clearSelection = () => {
    selectedFolder.value = undefined
  }
  
  return {
    // State
    folders,
    selectedFolder,
    searchQuery,
    
    // Computed
    selectedFolderId,
    
    // Actions
    setFolders,
    selectFolder,
    clearSelection
  }
}
