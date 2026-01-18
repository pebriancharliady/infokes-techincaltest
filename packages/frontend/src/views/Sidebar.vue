<script setup lang="ts">
import { inject } from 'vue'
import { FoldersContainer } from '@/components/Folder'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!
</script>

<template>
  <aside
    class="flex flex-col w-65 min-w-65 h-screen bg-neutral-100 border-r border-neutral-300 dark:bg-neutral-800 dark:border-neutral-700">
    <div class="p-4 border-b border-neutral-300 dark:border-neutral-700">
      <h2 class="text-sm font-semibold text-white uppercase tracking-wide dark:text-neutral-400">Infokes</h2>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div v-if="folderStore.isLoading.value && folderStore.folders.value.length === 0"
        class="p-4 text-center text-neutral-500 text-sm">
        Loading folders...
      </div>
      <div v-else-if="folderStore.error.value" class="p-4 text-center text-red-600 text-sm dark:text-red-400">
        {{ folderStore.error.value }}
      </div>
      <FoldersContainer v-else />
    </div>
  </aside>
</template>
