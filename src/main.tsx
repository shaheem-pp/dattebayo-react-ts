import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Characters from "./pages/Characters.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Characters/>
    </StrictMode>,
)
