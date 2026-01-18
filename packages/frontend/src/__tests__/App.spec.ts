import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

// Mock the folder service to prevent API calls
vi.mock('@/services/folderService', () => ({
  folderService: {
    getRootFolders: vi.fn().mockResolvedValue([])
  }
}))

describe('App', () => {
  it('mounts properly', () => {
    const wrapper = mount(App, {
      shallow: true
    })
    expect(wrapper.exists()).toBe(true)
  })
})
