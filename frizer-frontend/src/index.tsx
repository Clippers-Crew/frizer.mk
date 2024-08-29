
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalContextProvider } from './context/Context';
import ProtectedWrapper from './guard/ProtectedWrapper';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <GlobalContextProvider>
      <StrictMode>
        <ProtectedWrapper />
      </StrictMode>
    </GlobalContextProvider>
  </BrowserRouter>
);