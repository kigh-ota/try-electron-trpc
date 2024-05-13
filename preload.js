const { contextBridge } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

process.once('loaded', async () => {
  // main.exposeElectronTRPC();
  // sandbox有効だとモジュールをrequireできないのでコピペしてきている
  // 将来のelectron-trpcのアップデートでELECTRON_TRPC_CHANNELの定義が変わるなどすると壊れる可能性はある
  // Ref. https://github.com/jsonnull/electron-trpc/issues/116
  const ELECTRON_TRPC_CHANNEL = 'electron-trpc';
  const electronTRPC = {
    sendMessage: (operation) => ipcRenderer.send(ELECTRON_TRPC_CHANNEL, operation),
    onMessage: (callback) =>
      ipcRenderer.on(ELECTRON_TRPC_CHANNEL, (_event, args) => callback(args)),
  };
  contextBridge.exposeInMainWorld('electronTRPC', electronTRPC);
});
