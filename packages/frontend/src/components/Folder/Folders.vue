<script setup lang="ts">
import type { FolderItem } from '@/types/folder'

defineProps<{
    folders: FolderItem[]
}>()
</script>

<template>
    <div class="py-2">
        <slot />

        <div v-if="folders.length === 0" class="p-4 text-center text-neutral-500 text-sm">
            No folders found
        </div>
    </div>
</template>
