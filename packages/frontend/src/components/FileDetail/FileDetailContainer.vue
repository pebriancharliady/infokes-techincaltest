<script setup lang="ts">
import { inject } from 'vue'
import FileDetail from './FileDetail.vue'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!
</script>

<template>
    <FileDetail v-if="folderStore.selectedFile.value" :file="folderStore.selectedFile.value" />
</template>
