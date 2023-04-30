const { app, BrowserWindow, protocol, ipcMain, webFrame } = require("electron");

const path = require("path");
const url = require("url");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      zoomFactor: 0.9,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
      devTools: app.isPackaged ? false : true,
    },
  });


  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  mainWindow.loadURL(
    app.isPackaged
      ? url.format({
          pathname: path.join(__dirname, "index.html"),
          protocol: "file:",
          slashes: true,
        })
      : "http://localhost:3000/"
  );


}

// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // Setup a local proxy to adjust the paths of requested files when loading
  // them from the local production bundle (e.g.: local fonts, etc...).
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("close", () => {
  if (app.isPackaged) {
    app.quit();
  } else {
    const find = require("find-process");

    find("port", 3000)
      .then((list) => {
        if (list[0] != null) {
          app.quit();
          process.kill(list[0].pid, "SIGHUP");
        }
      })
      .catch((e) => {
        console.log(e.stack || e);
      });
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
