import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as log from 'electron-log';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

// Configuración de log para las actualizaciones
log.transports.file.level = 'info';
autoUpdater.logger = log;

// Necesario en caso de que process sea undefined en Linux
const platform = process.platform || os.platform();
const currentDir = fileURLToPath(new URL('.', import.meta.url));

let mainWindow: BrowserWindow | undefined;

async function createWindow() {
  /**
   * Opciones iniciales de la ventana
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, 'icons/icon.png'), // Icono para la bandeja
    width: 1000,
    height: 700,
    resizable: false,
    autoHideMenuBar: true, // Oculta la barra de menú
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // Más información: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
          'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ),
    },
  });

  // Cargar URL en modo desarrollo o archivo en producción
  if (process.env.DEV) {
    await mainWindow.loadURL(process.env.APP_URL);
  } else {
    await mainWindow.loadFile('index.html');

    // En producción, comprobamos y notificamos actualizaciones
    autoUpdater.checkForUpdatesAndNotify().catch((error) => {
      console.error('Error al comprobar actualizaciones:', error);
    });
  }

  // Abrir herramientas de desarrollo si la depuración está activada
  if (process.env.DEBUGGING) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

// Eventos del autoUpdater
autoUpdater.on('update-available', () => {
  log.info('Actualización disponible.');
  // Puedes comunicar este evento al frontend si así lo deseas
  if (mainWindow) {
    mainWindow.webContents.send('update-available');
  }
});

autoUpdater.on('update-downloaded', () => {
  log.info('Actualización descargada. Reiniciando...');
  // Reinicia la aplicación para instalar la actualización
  autoUpdater.quitAndInstall();
});

void app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    void createWindow();
  }
});
