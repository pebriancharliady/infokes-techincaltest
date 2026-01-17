<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { Folder, FolderItem } from '@/types/folder'
import { isFolder as isFolderType } from '@/types/folder'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const props = defineProps<{
  folder: FolderItem
  level?: number
}>()

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!

const isExpanded = ref(false)
const isLoadingChildren = ref(false)
const currentLevel = computed(() => props.level || 0)
const isFolder = computed(() => isFolderType(props.folder))
const hasChildren = computed(() => {
  if (!isFolder.value) return false
  const folder = props.folder as Folder

  return folder.children.length > 0 || folder.hasChildren === true
})
const isSelected = computed(() => folderStore.selectedFolderId.value === props.folder.id)

const toggleExpand = async (e: Event) => {
  e.stopPropagation()

  if (!isFolder.value) return

  const folder = props.folder as Folder

  if (isExpanded.value) {
    isExpanded.value = false
    return
  }

  if (folder.children.length === 0 && folder.hasChildren) {
    isLoadingChildren.value = true
    await folderStore.fetchFolderChildren(folder)
    isLoadingChildren.value = false
  }

  isExpanded.value = true
}

const handleSelect = async () => {
  if (isFolder.value) {
    await folderStore.selectFolder(props.folder as Folder)
  }
}
</script>

<template>
  <div class="select-none">
    <div :class="[
      'flex items-center gap-1.5 py-1.5 px-2 cursor-pointer rounded transition-colors',
      isSelected ? 'bg-sky-500 text-white' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
      !isFolder && 'cursor-default opacity-80 hover:!bg-transparent'
    ]" :style="{ paddingLeft: `${currentLevel * 16 + 8}px` }" @click="handleSelect">
      <span v-if="hasChildren" class="text-[10px] w-4 text-center cursor-pointer"
        :class="isSelected ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'" @click="toggleExpand">
        <template v-if="isLoadingChildren">⏳</template>
        <template v-else>{{ isExpanded ? '▼' : '▶' }}</template>
      </span>
      <span v-else class="w-4" />

      <span class="text-sm">{{ isFolder ? '📁' : '📄' }}</span>
      <span class="text-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-white">{{ folder.name }}</span>
    </div>

    <div v-if="isFolder && isExpanded && (folder as Folder).children.length > 0">
      <Folder v-for="child in (folder as Folder).children" :key="child.id" :folder="child" :level="currentLevel + 1" />
    </div>
  </div>
</template>
