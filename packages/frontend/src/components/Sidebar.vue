<script setup lang="ts">
import { inject } from 'vue'
import Folders from './Folders.vue'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>Infokes</h2>
    </div>
    
    <div class="sidebar-content">
      <Folders :folders="folderStore.folders.value" />
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  min-width: 260px;
  height: 100vh;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

@media (prefers-color-scheme: dark) {
  .sidebar {
    background-color: #1e1e1e;
    border-right-color: #333;
  }
  
  .sidebar-header {
    border-bottom-color: #333;
  }
  
  .sidebar-header h2 {
    color: #ccc;
  }
}
</style>
