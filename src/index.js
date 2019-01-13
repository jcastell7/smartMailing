import { app, BrowserWindow } from 'electron';
import path from 'path';
require("electron-reload")(__dirname);
let win
function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('file://' + path.join(__dirname, '/public/index.html'));
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})