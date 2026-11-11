import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { loadLang } from './lang.js'

document.body.dataset.lang = loadLang()

createRoot(document.getElementById('root')).render(<App />)
