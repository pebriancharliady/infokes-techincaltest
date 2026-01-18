<script setup lang="ts">
import { computed, inject } from 'vue'
import type { FolderItem } from '@/types/folder'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'
import Folder from './Folder.vue'

const props = defineProps<{
    folder: FolderItem
    level?: number
}>()

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!

const currentLevel = computed(() => props.level || 0)
const isSelected = computed(() => folderStore.selectedFolderId.value === props.folder.id)
const isExpanded = computed(() => folderStore.isFolderExpanded(props.folder.id))
const isLoadingChildren = computed(() => folderStore.isFolderLoading(props.folder.id))
</script>

<template>
    <Folder :folder="folder" :level="currentLevel" :is-selected="isSelected" :is-expanded="isExpanded"
        :is-loading-children="isLoadingChildren" @select="folderStore.selectFolder"
        @toggle-expand="folderStore.toggleFolderExpansion">
        <template #default="{ children, level }">
            <FolderContainer v-for="child in children" :key="child.id" :folder="child" :level="level" />
        </template>
    </Folder>
</template>
