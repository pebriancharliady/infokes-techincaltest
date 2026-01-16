<script setup lang="ts">
import { inject } from 'vue'
import type { Folder } from '@/types/folder'
import SubFolderList from './SubFolderList.vue'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!

const handleSubfolderClick = (folder: Folder) => {
  folderStore.selectFolder(folder)
}
</script>

<template>
  <main class="main-content">
    <div class="content-header">
      <h1 v-if="folderStore.selectedFolder.value">{{ folderStore.selectedFolder.value.name }}</h1>
      <h1 v-else>Select a folder</h1>
      
      <div v-if="folderStore.selectedFolder.value" class="header-info">
        {{ folderStore.selectedFolder.value.children.length }} item(s)
      </div>
    </div>
    
    <div class="content-body">
      <div v-if="!folderStore.selectedFolder.value" class="placeholder">
        <span class="placeholder-icon">👈</span>
        <p>Click a folder on the left to view its contents</p>
      </div>
      
      <SubFolderList
        v-else
        :folders="folderStore.selectedFolder.value.children"
        @select="handleSubfolderClick"
      />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;
  background-color: #fafafa;
}

.content-header h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.header-info {
  font-size: 13px;
  color: #888;
}

.content-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
}

.placeholder-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.placeholder p {
  margin: 0;
  font-size: 14px;
}

@media (prefers-color-scheme: dark) {
  .main-content {
    background-color: #121212;
  }
  
  .content-header {
    background-color: #1a1a1a;
    border-bottom-color: #333;
  }
  
  .content-header h1 {
    color: #e0e0e0;
  }
}
</style>
