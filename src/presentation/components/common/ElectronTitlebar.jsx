import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from 'react-icons/vsc';

export function ElectronTitlebar() {
  // Comprobar si estamos corriendo en Electron
  const isElectron = window.electron && window.electron.windowControls;

  if (!isElectron) {
    return null;
  }

  return (
    <div className="electron-titlebar">
      <div className="electron-titlebar__controls">
        <button 
          className="electron-titlebar__btn" 
          onClick={() => window.electron.windowControls.minimize()}
          title="Minimizar"
        >
          <VscChromeMinimize size={14} />
        </button>
        <button 
          className="electron-titlebar__btn" 
          onClick={() => window.electron.windowControls.maximize()}
          title="Maximizar"
        >
          <VscChromeMaximize size={14} />
        </button>
        <button 
          className="electron-titlebar__btn electron-titlebar__btn--close" 
          onClick={() => window.electron.windowControls.close()}
          title="Cerrar"
        >
          <VscChromeClose size={14} />
        </button>
      </div>
    </div>
  );
}