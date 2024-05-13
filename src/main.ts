import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { createIPCHandler } from 'electron-trpc/main';
import { router } from './api';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload.js'),
    },
  });

  createIPCHandler({ router, windows: [win] });

  win.loadFile('index.html');
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});
