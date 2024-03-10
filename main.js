const { app, BrowserWindow } = require('electron')
const express = require('express');
const path = require('path');
const expressAppPath = path.join(__dirname, 'src', 'Proyecto', 'app.js');//Poner donde está tu proyecto de express (server.js/app.js)

require(expressAppPath) //inicia express


function createWindow() {
    const mainWindow = new BrowserWindow({
        title: 'CAFES',
        icon: 'src/img/logo.png',
        autoHideMenuBar: true,
        width: 2560,
        height: 1600,
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
            accessibleTitle: 'CAFES',
            scrollBounce: true,
        }
    })

    // Cambia la URL a la del servicio de React
    mainWindow.loadURL('http://localhost:3000')
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
