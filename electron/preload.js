import { contextBridge } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // You can add methods here later, e.g.:
  // getAppVersion: () => ipcRenderer.invoke('get-app-version')
});
