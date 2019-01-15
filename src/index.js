import { app, BrowserWindow } from "electron";
var http = require("http");
import { taskForTheDay, updateCronDate } from "./models/task";
import * as mail from "./services/mailing";
const windowsScheduler = require('windows-scheduler');

require("electron-reload")(__dirname);
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

http
  .createServer(function(req, res) {
    executeTasks();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(req.url);
    res.end();
  })
  .listen(2019);

executeTasks();

const executeTasks = () => {
  let date = new Date();
  taskForTheDay(date).then(tasks => {
    tasks.forEach(item => {
      mail.sendMail(item);
      date.setDate(date.getDate() + item.cron_day);
      updateCronDate(item.id, date);
    });
  });
};

windowsScheduler.get("dailyMail").then((schedule) => {
  if (!schedule){
    windowsScheduler.create("dailyMail", "wget http://localhost:2019", { 
      frequency: 'DAILY',
      starttime: '9:00'
  });
  }
});