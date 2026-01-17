<script setup lang="ts">
import type { FolderItem } from '@/types/folder'
import Folder from './Folder.vue'

defineProps<{
  folders: FolderItem[]
}>()
</script>

<template>
  <div class="py-2">
    <Folder v-for="folder in folders" :key="folder.id" :folder="folder" :level="0" />

    <div v-if="folders.length === 0" class="p-4 text-center text-neutral-500 text-sm">
      No folders found
    </div>
  </div>
</template>
