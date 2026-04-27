import 'zmp-ui/zaui.css'
import './css/app.scss'
import './polyfills'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './app'

const root = createRoot(document.getElementById('app')!)
root.render(React.createElement(App))
