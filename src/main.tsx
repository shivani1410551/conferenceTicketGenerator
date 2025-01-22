import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import Practice from './Practice.jsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
{/* <Practice/> */}
  </StrictMode>,
)
