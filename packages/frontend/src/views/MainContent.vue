<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Folder, File } from '@/types/folder'
import SubFolderList from '../components/SubFolderList.vue'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!

const childrenCount = computed(() => {
  if (!folderStore.selectedFolder.value) return 0
  return folderStore.selectedFolder.value.children.length
})

const handleFolderClick = async (folder: Folder) => {
  await folderStore.selectFolder(folder)
}

const handleFileClick = async (file: File) => {
  await folderStore.selectFile(file)
}
</script>

<template>
  <main class="flex flex-col flex-1 h-screen bg-white overflow-hidden dark:bg-neutral-900">
    <div
      class="flex items-center justify-between px-6 py-4 border-b border-neutral-300 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700">
      <h1 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        {{ folderStore.selectedFolder.value?.name || 'Select a folder' }}
      </h1>
      <div v-if="folderStore.selectedFolder.value" class="text-sm text-neutral-500 flex items-center gap-2">
        <span v-if="folderStore.isLoading.value">Loading...</span>
        <span v-else>{{ childrenCount }} item(s)</span>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="folderStore.error.value"
        class="p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-center dark:bg-red-950 dark:border-red-800 dark:text-red-300">
        {{ folderStore.error.value }}
      </div>

      <div v-else-if="!folderStore.selectedFolder.value"
        class="flex flex-col items-center justify-center h-full text-neutral-500">
        <span class="text-5xl mb-4">👈</span>
        <p>Click a folder on the left to view its contents</p>
      </div>

      <div v-else-if="folderStore.isLoading.value && childrenCount === 0"
        class="flex flex-col items-center justify-center h-full text-neutral-500">
        <span class="text-5xl mb-4">⏳</span>
        <p>Loading contents...</p>
      </div>

      <SubFolderList v-else :folders="folderStore.selectedFolder.value.children" @select-folder="handleFolderClick"
        @select-file="handleFileClick" />
    </div>
  </main>
</template>
