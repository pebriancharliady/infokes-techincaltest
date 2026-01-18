<script setup lang="ts">
import type { Folder, FolderItem, File } from '@/types/folder'
import { isFolder } from '@/types/folder'

defineProps<{
    folders: FolderItem[]
}>()

const emit = defineEmits<{
    selectFolder: [folder: Folder]
    selectFile: [file: File]
}>()

const handleClick = (item: FolderItem) => {
    if (isFolder(item)) {
        emit('selectFolder', item)
    } else {
        emit('selectFile', item)
    }
}

const getItemInfo = (item: FolderItem): string => {
    if (!isFolder(item)) return ''

    const folder = item as Folder
    if (folder.children.length > 0) {
        return `${folder.children.length} items`
    }
    if (folder.childrenCount && folder.childrenCount > 0) {
        return `${folder.childrenCount} items`
    }
    return ''
}
</script>

<template>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 p-2">
        <div v-for="item in folders" :key="item.id"
            class="flex flex-col items-center gap-2 py-5 px-4 bg-neutral-100 border border-neutral-200 rounded-lg cursor-pointer transition-all hover:bg-sky-900 hover:border-sky-600 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-sky-900 dark:hover:border-sky-600"
            @click="handleClick(item)">
            <span class="text-3xl">{{ item.type === 'folder' ? '📁' : '📄' }}</span>
            <span class="text-[13px] font-medium text-neutral-800 text-center break-words dark:text-neutral-200">{{
                item.name }}</span>
            <span v-if="item.type === 'folder' && getItemInfo(item)"
                class="text-[11px] text-neutral-500 dark:text-neutral-400">
                {{ getItemInfo(item) }}
            </span>
        </div>

        <div v-if="folders.length === 0"
            class="col-span-full flex flex-col items-center justify-center py-12 text-neutral-500">
            <span class="text-5xl mb-3 opacity-50">📂</span>
            <p class="text-sm">No items</p>
        </div>
    </div>
</template>
