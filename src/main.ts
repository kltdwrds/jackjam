import { app, BrowserWindow } from "electron";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.webContents.openDevTools();
  if (process.env.APP_ENV === "development") {
    mainWindow.loadURL(`http://localhost:3000/index.html`);
  } else {
    mainWindow.loadFile("dist/index.html");
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
