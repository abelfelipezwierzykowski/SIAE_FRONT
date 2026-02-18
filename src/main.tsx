import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cabecalho from './components/Cabecalho/index.tsx'
import './styles/global.css'
import Information1 from './components/Information1/index.tsx'
import Information2 from './components/Information2/index.tsx'
import Footer from './components/Footer/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Cabecalho />
    <Information1 />
    <Information2 />
    <Footer />
  </StrictMode>,
)
