<script setup lang="ts">
import { provide, onMounted } from 'vue'
import MainContent from './views/MainContent.vue'
import Sidebar from './views/Sidebar.vue'
import FilePanel from './views/FilePanel.vue'
import { useFolderStore, FOLDER_STORE_KEY } from '@/composables/useFolderStore'

const folderStore = useFolderStore()
provide(FOLDER_STORE_KEY, folderStore)

onMounted(async () => {
  await folderStore.fetchRootFolders()
})
</script>

<template>
  <div class="flex w-full h-screen overflow-hidden">
    <Sidebar />
    <MainContent />
    <FilePanel />
  </div>
</template>
