import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'inherit',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
