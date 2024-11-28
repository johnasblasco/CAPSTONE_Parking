// frontend/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,  // Set your desired width
    height: 1000, // Set your desired height
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Ensure the window size is applied before loading the Vite app
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Load your Vite app
  mainWindow.loadURL('https://capstone-parking.vercel.app'); // Ensure this matches your Vite server port
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
