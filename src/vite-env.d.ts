/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORAGE: 'in-memory' | 'local-storage';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
