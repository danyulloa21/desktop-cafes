const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// const { App } = require('../../Proyecto/app'); // Adjust the path accordingly

let frontWindow;

app.whenReady().then(() => {
  // Create an instance of your Express app
  // const backApp = new App();

  // Start the Express server
  // const PORT = process.env.PORT || 3000;
  // backApp.listen(PORT)


  // Create the BrowserWindow after app is ready
  frontWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // Load your React app or any other necessary configurations
  frontWindow.loadURL(`file://${__dirname}/../dist/index.html`);


  frontWindow.show();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (frontWindow === null) {
    createWindow();
  }
});

app.commandLine.appendSwitch('disable-web-security');

