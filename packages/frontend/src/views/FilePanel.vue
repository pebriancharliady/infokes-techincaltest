<script setup lang="ts">
import { inject } from 'vue'
import { FileDetailContainer } from '@/components/FileDetail'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!

const handleClose = () => {
  folderStore.clearFileSelection()
}
</script>

<template>
  <aside v-if="folderStore.selectedFile.value"
    class="flex flex-col w-100 min-w-100 h-screen bg-white border-l border-neutral-300 dark:bg-neutral-800 dark:border-neutral-700 max-lg:w-80 max-lg:min-w-80">
    <div
      class="flex items-center justify-between p-4 border-b border-neutral-300 bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700">
      <h2 class="text-sm font-semibold text-neutral-800 uppercase tracking-wide dark:text-neutral-400">
        File Details
      </h2>
      <button
        class="bg-transparent border-none text-xl text-neutral-600 cursor-pointer size-8 flex items-center justify-center rounded hover:bg-neutral-200 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
        aria-label="Close" @click="handleClose">
        ✕
      </button>
    </div>

    <div class="flex-1 overflow-y-auto">
      <FileDetailContainer />
    </div>
  </aside>
</template>
