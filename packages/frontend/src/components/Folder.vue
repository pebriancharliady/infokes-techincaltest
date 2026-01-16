<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { Folder, FolderItem } from '@/types/folder'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const props = defineProps<{
  folder: FolderItem
  level?: number
}>()

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!

const isExpanded = ref(false)
const currentLevel = computed(() => props.level || 0)
const isFolder = computed(() => props.folder.type === 'folder')
const hasChildren = computed(() => {
  return isFolder.value && (props.folder as Folder).children.length > 0
})
const isSelected = computed(() => folderStore.selectedFolderId.value === props.folder.id)

const toggleExpand = (e: Event) => {
  e.stopPropagation()
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}

const handleSelect = () => {
  // Only allow selecting folders
  if (isFolder.value) {
    folderStore.selectFolder(props.folder as Folder)
  }
}
</script>

<template>
  <div class="folder-item">
    <div
      :class="['folder-row', { selected: isSelected, 'is-file': !isFolder }]"
      :style="{ paddingLeft: `${currentLevel * 16 + 8}px` }"
      @click="handleSelect"
    >
      <span v-if="hasChildren" class="expand-icon" @click="toggleExpand">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
      <span v-else class="expand-placeholder" />

      <span class="folder-icon">{{ isFolder ? '📁' : '📄' }}</span>
      <span class="folder-name">{{ folder.name }}</span>
    </div>

    <div v-if="isFolder && hasChildren && isExpanded" class="folder-children">
      <Folder
        v-for="child in (folder as Folder).children"
        :key="child.id"
        :folder="child"
        :level="currentLevel + 1"
      />
    </div>
  </div>
</template>

<style scoped>
.folder-item {
  user-select: none;
}

.folder-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}

.folder-row:hover {
  background-color: #e8e8e8;
}

.folder-row.selected {
  background-color: #3498db;
  color: white;
}

.folder-row.is-file {
  cursor: default;
  opacity: 0.8;
}

.folder-row.is-file:hover {
  background-color: transparent;
}

.expand-icon {
  font-size: 10px;
  width: 16px;
  text-align: center;
  cursor: pointer;
  color: #666;
}

.folder-row.selected .expand-icon {
  color: white;
}

.expand-placeholder {
  width: 16px;
}

.folder-icon {
  font-size: 14px;
}

.folder-name {
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
}

.folder-children {
  /* children inherit from parent */
}

@media (prefers-color-scheme: dark) {
  .folder-row:hover {
    background-color: #333;
  }

  .folder-row.selected {
    background-color: #2980b9;
  }

  .expand-icon {
    color: #aaa;
  }
}
</style>
