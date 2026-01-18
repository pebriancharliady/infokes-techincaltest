<script setup lang="ts">
import { inject } from 'vue'
import Folders from './Folders.vue'
import FolderContainer from './FolderContainer.vue'
import { FOLDER_STORE_KEY, type FolderStore } from '@/composables/useFolderStore'

const folderStore = inject<FolderStore>(FOLDER_STORE_KEY)!
</script>

<template>
    <Folders :folders="folderStore.folders.value">
        <FolderContainer v-for="folder in folderStore.folders.value" :key="folder.id" :folder="folder" :level="0" />
    </Folders>
</template>
