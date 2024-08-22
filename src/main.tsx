import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

let root = createRoot(document.getElementById('root')!);
export function rendering() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

rendering();
