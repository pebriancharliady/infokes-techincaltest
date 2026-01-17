<script setup lang="ts">
import { computed } from 'vue'
import type { File } from '@/types/folder'

const props = defineProps<{
    file: File
}>()

const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown size'

    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`
}

const fileExtension = computed(() => {
    const parts = props.file.name.split('.')
    return parts.length > 1 ? parts[parts.length - 1]?.toUpperCase() : 'FILE'
})

const fileIcon = '📄'
</script>

<template>
    <div class="flex flex-col gap-6 p-6 max-w-150">
        <div
            class="flex flex-col items-center gap-4 p-10 bg-gradient-to-br from-neutral-100 to-neutral-300 rounded-xl relative dark:from-neutral-700 dark:to-neutral-600">
            <div class="text-8xl drop-shadow-md">{{ fileIcon }}</div>
            <div
                class="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 rounded-md text-xs font-semibold text-neutral-600 shadow-sm dark:bg-black/50 dark:text-neutral-300">
                {{ fileExtension }}
            </div>
        </div>

        <div class="flex flex-col gap-5">
            <h2 class="text-2xl font-semibold text-neutral-800 break-words dark:text-neutral-200">{{ file.name }}</h2>

            <div
                class="flex flex-col gap-3 p-5 bg-neutral-100 rounded-lg border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
                <div class="flex justify-between items-start gap-4">
                    <span class="font-semibold text-neutral-600 min-w-20 dark:text-neutral-400">Type:</span>
                    <span class="text-neutral-800 text-right flex-1 break-words dark:text-neutral-200">{{ file.mimeType
                        || 'Unknown' }}</span>
                </div>

                <div class="flex justify-between items-start gap-4">
                    <span class="font-semibold text-neutral-600 min-w-20 dark:text-neutral-400">Size:</span>
                    <span class="text-neutral-800 text-right flex-1 break-words dark:text-neutral-200">{{
                        formatFileSize(file.size) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
