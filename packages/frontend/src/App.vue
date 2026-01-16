<script setup lang="ts">
import { provide } from 'vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'
import { useFolderStore, FOLDER_STORE_KEY } from './composables/useFolderStore'
import { mockFolderData } from './types/folder'

const folderStore = useFolderStore(mockFolderData)
provide(FOLDER_STORE_KEY, folderStore)
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <MainContent />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
