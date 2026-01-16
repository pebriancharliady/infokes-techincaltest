<script setup lang="ts">
import type { FolderItem } from '@/types/folder'
import Folder from './Folder.vue'

defineProps<{
  folders: FolderItem[]
}>()
</script>

<template>
  <div class="folders-tree">
    <Folder
      v-for="folder in folders"
      :key="folder.id"
      :folder="folder"
      :level="0"
    />
    
    <div v-if="folders.length === 0" class="empty-tree">
      No folders found
    </div>
  </div>
</template>

<style scoped>
.folders-tree {
  padding: 8px 0;
}

.empty-tree {
  padding: 16px;
  text-align: center;
  color: #888;
  font-size: 13px;
}
</style>
