// Overlay Player (MIT) - keeps rendering + gamepad input alive when the window
// is covered by a game or not focused.
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function create() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'Overlay Player',
    backgroundColor: '#00ff00',
    autoHideMenuBar: true,
    webPreferences: { backgroundThrottling: false, contextIsolation: true }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.on('page-title-updated', (e) => e.preventDefault());
  // F12 = DevTools (for debugging)
  win.webContents.on('before-input-event', (e, i) => {
    if (i.type === 'keyDown' && i.key === 'F12') win.webContents.toggleDevTools();
  });
}

app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
