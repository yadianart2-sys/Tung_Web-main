import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Importar configuración de i18n (debe cargarse antes que App)
import './i18n/index.js';

// Punto de entrada principal de la aplicación TUNG
// Renderiza el componente App dentro del elemento #root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
