<script setup lang="ts">
import { computed } from 'vue'
import type { Folder, FolderItem } from '@/types/folder'
import { isFolder as isFolderType } from '@/types/folder'

const props = defineProps<{
    folder: FolderItem
    level?: number
    isSelected?: boolean
    isExpanded?: boolean
    isLoadingChildren?: boolean
}>()

const emit = defineEmits<{
    select: [folder: Folder]
    toggleExpand: [folder: Folder, event: Event]
}>()

const currentLevel = computed(() => props.level || 0)
const isFolder = computed(() => isFolderType(props.folder))
const hasChildren = computed(() => {
    if (!isFolder.value) return false
    const folder = props.folder as Folder

    return folder.children.length > 0 || (folder.childrenCount !== undefined && folder.childrenCount > 0)
})

const handleToggleExpand = (e: Event) => {
    e.stopPropagation()
    if (isFolder.value) {
        emit('toggleExpand', props.folder as Folder, e)
    }
}

const handleSelect = () => {
    if (isFolder.value) {
        emit('select', props.folder as Folder)
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
                :class="isSelected ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'"
                @click="handleToggleExpand">
                <template v-if="isLoadingChildren">⏳</template>
                <template v-else>{{ isExpanded ? '▼' : '▶' }}</template>
            </span>
            <span v-else class="w-4" />

            <span class="text-sm">{{ isFolder ? '📁' : '📄' }}</span>
            <span class="text-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-white">{{
                folder.name
                }}</span>
        </div>

        <div v-if="isFolder && isExpanded && (folder as Folder).children.length > 0">
            <slot :children="(folder as Folder).children" :level="currentLevel + 1" />
        </div>
    </div>
</template>
