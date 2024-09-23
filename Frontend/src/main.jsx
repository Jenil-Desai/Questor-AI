import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeam.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BackgroundBeamsWithCollision className={"h-full"}> */}
    <App />
    {/* </BackgroundBeamsWithCollision> */}
  </StrictMode>,
)
