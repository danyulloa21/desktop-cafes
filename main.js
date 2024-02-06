const { app, BrowserWindow } = require('electron')
const express = require('express');
const path = require('path');
const expressAppPath = path.join(__dirname, 'src', 'Proyecto', 'app.js');
const expressApp  = require(expressAppPath)//Dejar este, inicia el proceso del back

const express2 = express();

// expressApp(express2)
// Utiliza la ruta completa para cargar tu servidor Express
// require(expressAppPath)(expressApp);

express2.use(express.static(path.join(__dirname, 'src', 'ProyectoFront', 'dist')));

express2.listen(3001, () => {
  console.log('Express server listening on port 3001');
})

function createWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Departamentos',
        icon: 'src/img/departamento.png',
        autoHideMenuBar: true,
        width: 520,
        height: 660,
        resizable: true,
        maximizable: true,
        fullscreenable: true,
        frame: true,
        closable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false,
            session: true,
            accessibleTitle: 'Departamentos',
            scrollBounce: true,
        }
    })

    // Cambia la URL a la del servicio de React
    mainWindow.loadURL('http://localhost:3001')
    // const startUrl = url.format({
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: 3001,
    //     pathname: 'src/ProyectoFront/dist/index.html',
    // });
    // mainWindow.loadURL(startUrl);
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {

    createWindow()
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

     app.on('window-all-closed', function () {
        
        app.exit()
        app.quit()

        if (process.platform !== 'darwin') app.quit()
    })

    
})
