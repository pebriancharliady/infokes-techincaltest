<script setup lang="ts">
import { inject, computed } from 'vue'
import SubFolderList from './SubFolderList.vue'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!

const children = computed(() => folderStore.selectedFolder.value?.children || [])
</script>

<template>
    <SubFolderList :folders="children" @select-folder="folderStore.selectFolderFromGrid"
        @select-file="folderStore.selectFileFromGrid" />
</template>
