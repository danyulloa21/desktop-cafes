const { app, BrowserWindow } = require('electron')
const path = require('path')
const child_process = require('child_process')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 520,
        height: 660,
        resizable: true,
        maximizable: true,
        fullscreenable: true,
        frame: true,
        closable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // Cambia la URL a la del servicio de React
    mainWindow.loadURL('http://localhost:5173')
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {

    createWindow()
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    try{
        // Start your React and Express services
    const serverProcess = child_process.spawn('npm', ['run', 'start'], {
        cwd: path.join(__dirname, './src/Proyecto'), // Assuming your services are in the parent directory
        shell: true,
        stdio: 'inherit'
    })

    const clientProcess = child_process.spawn('npm', ['run', 'dev'], {
        cwd: path.join(__dirname, './src/ProyectoFront'), // Assuming your services are in the parent directory
        shell: true,
        stdio: 'inherit'
    })


        // When the main window is closed, also quit the React and Express services
        app.on('window-all-closed', function () {
            serverProcess.kill()
            clientProcess.kill()
    
            if (process.platform !== 'darwin') app.quit()
        })


    }catch(error){
        console.error('Hubo un error', error)
    }
    
})
