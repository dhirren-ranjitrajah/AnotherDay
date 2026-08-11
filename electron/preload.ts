import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  // Expose IPC-safe APIs to the renderer here as the app grows.
})
