<script setup lang="ts">
import type { Folder, FolderItem } from '@/types/folder'

defineProps<{
  folders: (Folder | FolderItem)[]
}>()

const emit = defineEmits<{
  select: [folder: Folder]
}>()

const handleClick = (item: FolderItem) => {
  if (item.type === 'folder') {
    emit('select', item as Folder)
  }
}

const getItemCount = (item: FolderItem) => {
  if (item.type === 'folder') {
    return (item as Folder).children.length
  }
  return 0
}
</script>

<template>
  <div class="subfolder-list">
    <div
      v-for="item in folders"
      :key="item.id"
      :class="['subfolder-item', { 'is-file': item.type === 'file' }]"
      @click="handleClick(item)"
    >
      <span class="subfolder-icon">{{ item.type === 'folder' ? '📁' : '📄' }}</span>
      <span class="subfolder-name">{{ item.name }}</span>
      <span v-if="item.type === 'folder' && getItemCount(item) > 0" class="subfolder-count">
        {{ getItemCount(item) }} items
      </span>
    </div>
    
    <div v-if="folders.length === 0" class="empty-state">
      <span class="empty-icon">📂</span>
      <p>No items</p>
    </div>
  </div>
</template>

<style scoped>
.subfolder-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  padding: 8px;
}

.subfolder-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.subfolder-item:hover {
  background-color: #e8f4fc;
  border-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.subfolder-item.is-file {
  cursor: default;
  opacity: 0.9;
}

.subfolder-item.is-file:hover {
  background-color: #f8f8f8;
  border-color: #e0e0e0;
  transform: none;
  box-shadow: none;
}

.subfolder-icon {
  font-size: 32px;
}

.subfolder-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  text-align: center;
  word-break: break-word;
}

.subfolder-count {
  font-size: 11px;
  color: #888;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: #888;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

@media (prefers-color-scheme: dark) {
  .subfolder-item {
    background-color: #2a2a2a;
    border-color: #444;
  }
  
  .subfolder-item:hover {
    background-color: #1e3a4d;
    border-color: #2980b9;
  }
  
  .subfolder-name {
    color: #e0e0e0;
  }
  
  .subfolder-count {
    color: #777;
  }
}
</style>
